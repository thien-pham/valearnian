const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
// const app = express();
let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  SERVER: process.env.SERVER
};

if(process.env.NODE_ENV != 'production') {
  secret = require('../secret');
}
// app.use(passport.initialize());
// const questions = require('./routes/questions');
mongoose.connect(secret.SERVER, err => {
  if(err) {
    console.log('Cannot connect');
  } else {
    console.log('connected to database');
  }
});

const database = {
};

//need a function to add data to database

passport.use(
    new GoogleStrategy({
        clientID:  secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        // Job 1: Set up Mongo/Mongoose, create a User model which store the
        // google id, and the access token
        // Job 2: Update this callback to either update or create the user
        // so it contains the correct access token
        const user = database[accessToken] = {
            googleId: profile.id,
            accessToken: accessToken
        };
        console.log(`This is the userId:${JSON.stringify(user)}`);
        console.log(`This is the profileId:${profile.id}`);
        console.log(`This is the accessToken:${accessToken}`);
        return cb(null, user);
    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
            // Job 3: Update this callback to try to find a user with a
            // matching access token.  If they exist, let em in, if not,
            // don't.
            if (!(token in database)) {
                return done(null, false);
            }
            return done(null, database[token]);
        }
    )
);

//This is the login page
router.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json({
        googleId: req.user.googleId
    })
);
router.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

router.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/');
    }
);
//If successful login-----------------------------------
//render the questions
router.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json(['Question 1', 'Question 2', 'Question Three'])
);
router.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});



// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
router.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

module.exports = router;