const mongoose = require('mongoose');
// const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  }
});

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

questionSchema.methods.apiRepr = function() {
  return {
    question: this.question,
    answer: this.answer
  }
}

const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Questions', questionSchema);

module.exports = {User, Question};
