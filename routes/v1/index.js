'use strict';

const { Router } = require('@lykmapipo/express-router-extra');
const { getString } = require('@lykmapipo/env');
const User = require('../../models/');

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

router.get('/users', (req, res, next) => {
  const options = req.options;
  // const users = User.fake(50);

  User.find(options, (error, results) => {
    if (error) {
      return res.status(400).json(error);
    }
    res.status(200).json(results);
  });
});

router.post('/register', (req, res, next) => {
  const { email, name, password } = req.body;

  const credentails = {
    email,
    name,
    password,
  };

  User.register(credentails, function (error, registerable) {
    if (error) {
      res.status(400).json(error);
    }
    // console.log(registerable);
    res.status(201).json({ message: `User ${name} created` });
  });
});

module.exports = router;
