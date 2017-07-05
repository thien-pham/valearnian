const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passport = require('passport');
const path = require('path');

import {User, Question} from '../models';

router.get('/questions/:userId',
  passport.authenticate('bearer', {session: false}),
    (req, res) => {
        let userId = req.params.userId;
        User.findOne({_id: userId},
          (err, user) => {
            if (err) return console.error(err);
            return getQuestion(user);
          }
      );
});

router.get('/questions', (req, res) => {
  Questions
    .find({}, (err, question) => {
      if(err) {
        res.send(err);
      }
      res.json(question);
    });
});

module.exports = router;
