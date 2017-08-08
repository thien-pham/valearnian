require('dotenv').config();
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://user:123@ds145312.mlab.com:45312/valearnian';
exports.PORT = process.env.PORT || 3001 || 'https://valearnon.herokuapp.com';
