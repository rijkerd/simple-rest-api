const _ = require('lodash');
const { getString } = require('@lykmapipo/env');
const { include } = require('@lykmapipo/include');
const { Router } = require('@lykmapipo/express-common');
const {
  getFor,
  schemaFor,
  getByIdFor,
  postFor,
} = require('@lykmapipo/express-rest-actions');

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/users/:id';
const PATH_LIST = '/users';

const User = include(__dirname, 'user.model');

const router = new Router({
  version: API_VERSION,
});

router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => User.get(options, done),
  })
);

router.get(
  PATH_SINGLE,
  getByIdFor({
    getById: (options, done) => User.findById(options, done),
  })
);

router.post(
  `${PATH_LIST}/register`,
  postFor({
    post: (body, done) => {
      console.log(body);
      const options = _.pick(body, ['name', 'email', 'password']);
      return User.register(options, done);
    },
  })
);

router.post(
  `${PATH_LIST}/login`,
  postFor({
    post: (body, done) => {
      const options = _.pick(body, ['email', 'password']);
      return User.authenticate(options, done);
    },
  })
);

module.exports = router;
