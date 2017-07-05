const path = require('path');
const express = require('express');
// const passport = require('passporter);
// const googlestrategy = require('passport-google-oauth20').strategy;
// const bearerstrategy = require('passport-http-bearer').strategy;
const jsonParser = require('body-parser').json();
const app = express();
const logger = require('morgan');
app.use(logger('combined'));
//The user schema
const User = require('./models');
const mongoose = require('mongoose');
const {SERVER} = require('./secret');
//Router to authenticate
const mainRoutes = require('./routes/main');
app.use(mainRoutes);
app.use(jsonParser);
// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// app.get('/', (req,res) => res.console.log('------------------yolo!----------------'));
// app.post('/user', (req, res, next) => {
//     const user = new User();
//     user.username = req.body.username;
//     user.password = req.body.password;
//     if(err) next(err);
//     res.json('Successfully created');
// });

let server;
// function runServer(port=3001) {
//     return new Promise((resolve, reject) => {
//         server = app.listen(port, () => {
//             resolve();
//         }).on('error', reject);
//     });
// }
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
         mongoose.connect(SERVER, err => {
            if(err) {
              return reject(err);
        }
            console.log('Db connected');
            server = app.listen(port, () => {
                resolve();
            }).on('error', reject);
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
