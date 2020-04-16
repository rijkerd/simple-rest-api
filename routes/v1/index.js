'use strict';

const controller = require('../../controllers/user');

const { Router } = require('@lykmapipo/express-router-extra');
const { getString } = require('@lykmapipo/env');

const NODE_ENV = getString('NODE_ENV', 'development');

const router = new Router({
  version: '1.0.0',
});

router.get('/.:ext?', function (request, response) {
  response.json({
    mode: NODE_ENV,
    message: 'Hello World',
  });
});

router.get('/users', controller.list);

router.post('/register', controller.register);

module.exports = router;
