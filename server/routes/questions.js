const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passport = require('passport');
const path = require('path');

import {User, Question} from '../models';

const questionResponse = (questionId, word, score) => {
    return { questionId, word, score, result};
};

router.get('/questions', passport.authenticate('bearer', { session: false }), (req, res) => {
    const word = req.user.questions[0];
    res.status(200).json(questionResponse(word.questionId, word.word, req.user.score, false));
});

// router.get('/questions/:userId',
//   passport.authenticate('bearer', {session: false}),
//     (req, res) => {
//         let userId = req.params.userId;
//         User.findOne({_id: userId},
//           (err, user) => {
//             if (err) return console.error(err);
//             //match with current user
//             // return fn(user);
//           }
//       );
// });
//
// router.get('/questions', (req, res) => {
//   Questions
//     .find({}, (err, question) => {
//       if(err) {
//         res.send(err);
//       }
//       res.json(question);
//     });
// });

module.exports = router;
