require('dotenv').config();
exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL;
exports.PORT = process.env.PORT || 8080;
exports.CLIENT_ID         = process.env.CLIENT_ID;
exports.CLIENT_SECRET     = process.env.CLIENT_SECRET;
exports.URL 							= process.env.NODE_ENV === 'production'
	? 'https://valearnon.herokuapp.com'
	: 'http://localhost:8080';
