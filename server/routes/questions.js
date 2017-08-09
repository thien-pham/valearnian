const express = require('express');
const qRoutes = require( 'express' ).Router( );
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passport = require('passport');
const path = require('path');
const { User, Question } = require('../models');
// import {User, Question} from '../models';

// const questionResponse = (questionId, word, score) => {
//     return { questionId, word, score, result};
// };
//
// router.get('/questions', passport.authenticate('bearer', { session: false }), (req, res) => {
//     const word = req.user.questions[0];
//     res.status(200).json(questionResponse(word.questionId, word.word, req.user.score, false));
// });


qRoutes.get('/questions/:userId',
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
            Questions.findOne({
                _id: questionId
            }, (err, question) => {
                if (err) return res.send(err);
                return res.json({
                    question,
                    result
                });
            });
        }
    });

qRoutes.get('/questions',
  passport.authenticate('bearer', {session: false}), (req, res) => {
    Questions
      .find({}, (err, question) => {
        if(err) {
          res.send(err);
        }
        res.json(question);
      });
});

module.exports = qRoutes;
