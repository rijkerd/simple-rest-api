'use strict';

const mongoose = require('mongoose');


const mongooseConnect = function () {
    mongoose.connect('mongodb://localhost:27017/userstz');
};

mongoose.Promise = Promise;

mongoose.connection.on('error', function () {
    mongoose.disconnect();
});

mongoose.connection.on('disconnected', function () {
    setTimeout(mongooseConnect, 10240);
});

mongooseConnect();

exports.checkState = function (request, response, next) {
    if (mongoose.connection.readyState !== 1) {
        var err = new Error('Database connection is not established');
        err.status = 500;
        next(err);
    }

    next();
};
