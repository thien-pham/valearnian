const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  googleId: {type: String, required: true},
  accessToken: {type: String}
});

const userSchema = mongoose.Schema({
    googleId: {type: String, required: true},
    accessToken: {type: String, required: true},
    name: {type: String, required: false},
    email: {type: String, required: false},
    points: {type: Number, required: false}
})

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

const Question = mongoose.model('Questions', questionSchema);
const User = mongoose.model('User', userSchema);

module.exports = {User, Question};
