const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// const logger = require('morgan');
// app.use(logger('combined'));
require('dotenv').config();
const {DATABASE_URL, PORT} = process.env;
const { User, Question } = require('./models');
//The user schema
// const {SERVER} = require('./secret');
//Router to authenticate
// const mainRoutes = require('./routes/main');
// Serve the built client

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  SERVER: process.env.SERVER
};

if(process.env.NODE_ENV != 'production') {
  secret = require('../secret');
}

const app = express();

// app.use(mainRoutes);
// app.use(jsonParser);
app.use(passport.initialize());
app.use(bodyParser.json());

app.get('/questions/:userId',
  passport.authenticate('bearer', {session: false}),
    (req, res) => {
        let userId = req.params.userId;
        User.find({_id: userId},
          (err, user) => {
            if (err) {
              return console.error(err);
            }
            const word = req.user.questions[0];
            return res.json({})
            }
        );

        const getQuestion = (userInfo) => {
            let result = userInfo.questions[0].questionId;
            Questions.findOne({_id: questionId},
              (err, question) => {
                if (err) {
                  return res.send(err);
                }
                return res.json({question, result});
            });
        }
    });

app.get('/questions', passport.authenticate('bearer', {session: false}), (req, res) => {
  Questions
    .find({}, (err, question) => {
      if(err) {
        res.send(err);
      }
      res.json(question);
    });
});

passport.use(
    new GoogleStrategy({
        clientID:  secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        User.find({
          googleId: profile.id
        }, (err, user) => {
          if(!user.length) {
            User.create({
              accessToken: accessToken,
              googleId: profile.id,
              name: profile.displayName,
            }, function(err, user){
              return cb(null, user)
            });
          }else {
            return cb(null, user[0])
          }
        });
    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
            User.find({accessToken: token}, function(err, user) {
              if(err) console.log(err);
              if(!user.length) {
                return done(null, false);
             }
            return done(null, user[0]);
            });
        }
    )
);

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

app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
        Question
        .find()
        .exec()
        .then( question => {
            res.json(question);
        })
        .catch(err => console.log(err));
    });

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
    return new Promise((resolve, reject) => {
         mongoose.connect(databaseUrl, err => {
            if(err) {
              return reject(err);
        }
            console.log('Db connected', port);
            server = app.listen(port, () => {
                resolve();
            }).on('error', reject);
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
