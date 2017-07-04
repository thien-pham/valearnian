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

const User = mongoose.model('User', userSchema);

module.exports = {User};
