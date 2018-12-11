'use strict';

const User = require('../models/index');

/**
 * @method list
 * @param request{Object} 
 * @param response{Object}
 * 
 * @description user controllers function that returns a list of all users
 * @todo Query from the database a list of all available users
 * 
 */
exports.list = function (request, response) {
    const user = User.fake(5);
    response.json(user);
};


exports.register = function (request, response) {
    console.log(request.body);
    const credentails = {
        email: request.body.email,
        name: request.body.name,
        password: request.body.password
    }
    User.register(credentails, function (error, registerable) {
        if (error) {
            response.status(400).json(error);
        }
        response.status(201).json(registerable);
    });
};

