'use strict';

const User = require('../models/index');

/**
 * @method list
 * @param request{Object} 
 * @param response{Object}
 * 
 * @description user controllers function that returns a list of all users
 * 
 * @returns {error} fail to get the list of users
 * @returns {success} users with name and email fields 
 */
exports.list = function (request, response) {
    User.find({}, 'name email', (error, users) => {
        if (error) {
            response.status(204).json({ error: 'Fetching users' });
        }
        response.status(200).json(users);
    });
};


/**
 * @method register
 * @param request{Object}
 * @param response{Object}
 * 
 * @description user controller function to register user
 * 
 * @returns {error} corresponding registration error
 * @returns {success} message with the created user name
 */
exports.register = function (request, response) {
    const { email, name, password } = response.body;

    const credentails = {
        email,
        name,
        password
    };

    User.register(credentails, function (error, registerable) {
        if (error) {
            response.status(400).json(error);
        }
        const { name } = registerable;
        response.status(201).json({ message: `User ${name} created` });
    });
};

