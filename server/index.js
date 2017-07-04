const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

if (process.env.NODE_ENV != 'production') {
  secret = require('./secret');
}

const app = express();

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

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

let server;
function runServer(port = 3001) {
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        resolve();
      })
      .on('error', reject);
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
  app,
  runServer,
  closeServer,
};
