const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const path = require('path');

router.get('/questions', (req, res) => {
  console.log('Yolo this is questions');
});

