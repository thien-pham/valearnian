const path = require('path');
const express = require('express');
// const passport = require('passporter);
// const googlestrategy = require('passport-google-oauth20').strategy;
// const bearerstrategy = require('passport-http-bearer').strategy;
const jsonParser = require('body-parser').json();
const app = express();
<<<<<<< HEAD

const database = {};

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: secret.CLIENT_ID,
      clientSecret: secret.CLIENT_SECRET,
      callbackURL: `/api/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, cb) => {
      // Job 1: Set up Mongo/Mongoose, create a User model which store the
      // google id, and the access token
      // Job 2: Update this callback to either update or create the user
      // so it contains the correct access token

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
                    name: profile.displayName,
                    username: profile.username,
                })
            })
            .then(user => cb(null, {googleId: user.googleId, accessToken: user.accessToken}))
            .catch(err => console.error(err))
    }
));

passport.use(
  new BearerStrategy((token, done) => {
    // Job 3: Update this callback to try to find a user with a
    // matching access token.  If they exist, let em in, if not,
    // don't.
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

app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile']}));

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    res.cookie('accessToken', req.user.accessToken, { expires: 0 });
    res.redirect('/');
  }
);

app.get('/api/auth/logout', (req, res) => {
  req.logout();
  res.clearCookie('accessToken');
  res.redirect('/');
});

app.get('/api/me',
  passport.authenticate('bearer', { session: false }),
  (req, res) => res.json({
      googleId: req.user.googleId
    })
);

app.get('/api/questions',
  passport.authenticate('bearer', { session: false }),
  (req, res) => res.json(['Question 1', 'Question 2'])
);

=======
const logger = require('morgan');
// app.use(logger('combined'));rs
//The user schema
const User = require('./models');
const mongoose = require('mongoose');
const {SERVER} = require('./secret');
//Router to authenticate
const mainRoutes = require('./routes/main');
app.use(mainRoutes);
app.use(jsonParser);
>>>>>>> master
// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', (req,res) => res.console.log('------------------yolo!----------------'));
app.post('/user', (req, res, next) => {
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    if(err) next(err);
    res.json('Successfully created');
});

let server;
// function runServer(port=3001) {
//     return new Promise((resolve, reject) => {
//         server = app.listen(port, () => {
//             resolve();
//         }).on('error', reject);
//     });
// }
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
         mongoose.connect(SERVER, err => {
            if(err) {
              return reject(err);
        }
            console.log('Db connected');
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