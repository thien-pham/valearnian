const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bodyParser = require('body-parser');
require('dotenv').config();
mongoose.Promise = global.Promise;

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL
};

if(process.env.NODE_ENV != 'production') {
  secret = require('./secret');
}

const app = express();
const {DATABASE_URL, PORT} = require('./config');
const { User, Question } = require('./models');

// app.use(mainRoutes);
// app.use(jsonParser);
app.use(passport.initialize());
app.use(bodyParser.json());

passport.use(
    new GoogleStrategy({
        clientID:  secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        return User
            .findOne({googleId: profile.id})
            .exec()
            .then(user => {
                if (user) {
                    return User.findByIdAndUpdate(user._id, {$set: {accessToken}}, {new: true})
                }
                return User.create({
                    googleId: profile.id,
                    accessToken,
                    name: profile.displayName
                })
            })
            .then(user => cb(null, {googleId: user.googleId, accessToken: user.accessToken}))
            .catch(err => console.error(err))
    }
));

passport.use(
    new BearerStrategy(
      (token, done) => {
        return User.findOne({accessToken: token})
          .exec()
          .then((user) => {
              if (!user) {
                  return done(null, false);
              }
              return done(null, user);
          })
          .catch(err => console.error(err))
        }
    )
);

// Authentication endpoints
app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json({
        googleId: req.user.googleId,
        name: req.user.name
    })
);

app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/');
    }
);

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

//API endpoints
// app.get('/api/questions',
//   passport.authenticate('bearer', {session: false}),
//   (req, res) => {
//     Questions
//       .find({}, (err, question) => {
//         if(err) {
//           res.send(err);
//         }
//         res.json(question);
//       });
// });
app.get('/api/questions',
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    Question
      .find()
      .exec()
      .then(questions => {
        return res.json(questions.map(question => question.apiRepr()));
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({error: "Something's gone awry."});
      });
});

// app.get('/api/users/:accessToken', (req, res) => {
//   User
//     .findOne({accessToken: req.params.accessToken})
//     .then(user =>{
//       console.log(user);
//       return res.json(user);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({error: "Something's gone terribly awry"});
//     });
// });

// app.get('/api/questions/:userId',
//   passport.authenticate('bearer', {session: false}),
//     (req, res) => {
//         let userId = req.params.userId;
//         User.find({_id: userId},
//           (err, user) => {
//             if (err) {
//               return console.error(err);
//             }
//             const word = req.user.questions[0];
//             return res.json({})
//             }
//         );
//
//         const getQuestion = (userInfo) => {
//             let result = userInfo.questions[0].questionId;
//             Questions.findOne({_id: questionId},
//               (err, question) => {
//                 if (err) {
//                   return res.send(err);
//                 }
//                 return res.json({question, result});
//             });
//         }
//     });



// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));
// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;

function runServer(port=PORT) {
    return new Promise((resolve, reject) => {
         mongoose.connect(DATABASE_URL, err => {
            if(err) {
              return reject(err);
            }
            console.log('Db connected', port);
            server = app.listen(port, () => {
                resolve();
            })
            .on('error', err => {
              reject(err);
            });
        });
    });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
      });
  });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
