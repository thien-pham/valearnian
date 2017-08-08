const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const { User, Question } = require('./models');
const jsonParser = require('body-parser').json();
const app = express();
// const logger = require('morgan');
// app.use(logger('combined'));
require('dotenv').config();
const {DATABASE_URL, PORT} = process.env;
//The user schema
const mongoose = require('mongoose');
// const {SERVER} = require('./secret');
//Router to authenticate
const mainRoutes = require('./routes/main');
app.use(mainRoutes);
app.use(jsonParser);
// Serve the built client

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  SERVER: process.env.SERVER
};

if(process.env.NODE_ENV != 'production') {
  secret = require('../secret');
}

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
            })
            return cb(null, user)
          }else {
            return cb(null, user[0])
          }
        })
        /*
        const user = database[accessToken] = {
            googleId: profile.id,
            accessToken: accessToken
        }
        User
          .findOne({googleId: profile.id})
          .exec()
          .then(user => {
            if(user){
              return User
              .findByIdAndUpdate(user.id, {
                $set: {accessToken}}, {new: true})
            }
            return User.create({
              googleId: profile.id,
              accessToken: accessToken
            })
          })
          .then(user => {
            cb(null, {googleId: user.googleId , accessToken: user.accessToken});
          })
          .catch(err => console.error(err));
          */
        //The user is just an object with id token prop
        // console.log(`This is the database:${JSON.stringify(database)}`);
        // console.log(`This is the profileId:${profile.id}`);
        // console.log(`This is the accessToken:${accessToken}`);
        //return cb(null, user);
    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
            User.find({accessToken:token}, function(err,user){
              console.log('USER', user);
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
// function runServer(port=3001) {
//     return new Promise((resolve, reject) => {
//         server = app.listen(port, () => {
//             resolve();
//         }).on('error', reject);
//     });
// }
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
