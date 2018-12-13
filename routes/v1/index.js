'use strict';

const controller = require('../../controllers/user');

const Router = require('@lykmapipo/express-router-extra').Router;

const router = new Router({
    version: '1.0.0'
});

router.get('/\.:ext?', function (request, response) {
    response.json({
        'mode': process.env.NODE_ENV,
        'message': 'Hello World'
    });
});

router.get('/users', controller.list);

router.post('/register', controller.register);

module.exports = router;