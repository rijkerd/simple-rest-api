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
    const user = User.fake(10);
    response.json(user)
}


exports.register = function (request, response) {
    const credentails = {
        name: "Ricardo",
        email: "richardaggrey7@gmail.com",
        password: "123456"
    }
    User.register(credentails, function (error, registerable) {
        if (error) {
            response.json(error)
        }
        response.json(registerable)
    })
}