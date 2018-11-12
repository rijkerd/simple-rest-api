const User = require('../models/index');

/**
 * @param users{Array} 
 * @description random local values
 */
const users = [{ "name": "richard" }, { "name": "nanelle" }]

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
    const user = User.fake(100);
    response.json(user)
}