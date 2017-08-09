// const authRoutes = require('express').Router();
// const mongoose = require('mongoose');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const BearerStrategy = require('passport-http-bearer').Strategy;
// const { User, Question } = require('../models');
// // const app = express();
//
// let secret = {
//   CLIENT_ID: process.env.CLIENT_ID,
//   CLIENT_SECRET: process.env.CLIENT_SECRET,
//   DATABASE_URL: process.env.DATABASE_URL
// };
//
// if(process.env.NODE_ENV != 'production') {
//   secret = require('../secret');
// }
//
// const database = {
// };
//
// authRoutes.use(passport.initialize());
//
// passport.use(
//   new GoogleStrategy({
//     clientID:  secret.CLIENT_ID,
//     clientSecret: secret.CLIENT_SECRET,
//     callbackURL: `/api/auth/google/callback`
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       return User
//         .findOne({googleId: profile.id})
//         .exec()
//         .then(user => {
//             if (user) {
//                 return User.findByIdAndUpdate(user._id, {$set: {accessToken}}, {new: true})
//             }
//             return User.create({
//                 googleId: profile.id,
//                 accessToken,
//                 name: profile.displayName
//             })
//         })
//         .then(user => cb(null, {googleId: user.googleId, accessToken: user.accessToken}))
//         .catch(err => console.error(err))
//     }
// ));
//
//
// passport.use(
//   new BearerStrategy(
//     (token, done) => {
//       return User.findOne({accessToken: token})
//         .exec()
//         .then((user) => {
//           if (!user) {
//             return done(null, false);
//           }
//           return done(null, user);
//         })
//         .catch(err => console.error(err))
//       }
//     )
// );
//
// authRoutes.get('/api/me',
//     passport.authenticate('bearer', {session: false}),
//     (req, res) => res.json({
//         googleId: req.user.googleId,
//         name: req.user.name
//     })
// );
//
// authRoutes.get('/api/auth/google',
//     passport.authenticate('google', {scope: ['profile']}));
//
// authRoutes.get('/api/auth/google/callback',
//     passport.authenticate('google', {
//         failureRedirect: '/',
//         session: false
//     }),
//     (req, res) => {
//         res.cookie('accessToken', req.user.accessToken, {expires: 0});
//         res.redirect('/');
//     }
// );
//
// // router.get('/api/questions',
// //     passport.authenticate('bearer', {session: false}),
// //     (req, res) => {
// //         Question
// //         .find()
// //         .exec()
// //         .then( question => {
// //             res.json(question);
// //         })
// //         .catch(err => console.log(err));
// //     });
//
// authRoutes.get('/api/auth/logout', (req, res) => {
//     req.logout();
//     res.clearCookie('accessToken');
//     res.redirect('/');
// });
//
//
// // Unhandled requests which aren't for the API should serve index.html so
// // client-side routing using browserHistory can function
// // router.get(/^(?!\/api(\/|$))/, (req, res) => {
// //     const index = path.resolve(__dirname, '../client/build', 'index.html');
// //     res.sendFile(index);
// // });
//
// module.exports = authRoutes;
