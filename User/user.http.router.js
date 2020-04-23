const _ = require('lodash');
const { getString } = require('@lykmapipo/env');
const { include } = require('@lykmapipo/include');
const { Router } = require('@lykmapipo/express-common');
const {
  getFor,
  schemaFor,
  getByIdFor,
  postFor,
  patchFor,
  putFor,
  deleteFor,
} = require('@lykmapipo/express-rest-actions');

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/users/:id';
const PATH_LIST = '/users';
// const PATH_EXPORT = '/users/export';
const PATH_SCHEMA = '/users/schema/';

const User = include(__dirname, 'user.model');

const router = new Router({
  version: API_VERSION,
});

/**
 * @api {get} /users List Users
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup User
 * @apiDescription Returns a list of users
 * @apiUse RequestHeaders
 * @apiUse Users
 *
 * @apiUse RequestHeadersExample
 * @apiUse UsersSuccessResponse
 */

router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => User.get(options, done),
  })
);

/**
 * @api {get} /user/schema Get User Schema
 * @apiVersion 1.0.0
 * @apiName GetUserSchema
 * @apiGroup User
 * @apiDescription Returns user json schema definition
 * @apiUse RequestHeaders
 */

router.get(
  PATH_SCHEMA,
  schemaFor({
    getSchema: (query, done) => {
      const jsonSchema = User.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

/**
 * @api {get} /user/:id Get Existing User
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup User
 * @apiDescription Get existing User
 * @apiUse RequestHeaders
 * @apiUse User
 *
 * @apiUse RequestHeadersExample
 * @apiUse UserSuccessResponse
 */

router.get(
  PATH_SINGLE,
  getByIdFor({
    getById: (options, done) => User.findById(options, done),
  })
);

/**
 * @api {post} /users/register Register new User
 * @apiVersion 1.0.0
 * @apiName RegisterUser
 * @apiGroup User
 * @apiDescription Register new user
 * @apiUse RequestHeaders
 * @apiUse User
 *
 * @apiUse RequestHeadersExample
 * @apiUse PermissionSuccessResponse
 */

router.post(
  `${PATH_LIST}/register`,
  postFor({
    post: (body, done) => {
      const options = _.pick(body, ['name', 'email', 'password']);
      return User.register(options, done);
    },
  })
);

/**
 * @api {patch} /users/:id Patch Existing User
 * @apiVersion 1.0.0
 * @apiName PatchUser
 * @apiGroup User
 * @apiDescription Patch existing user
 * @apiUse RequestHeaders
 * @apiUse User
 *
 * @apiUse RequestHeadersExample
 * @apiUse UserSuccessResponse
 */

router.patch(
  PATH_SINGLE,
  patchFor({
    patch: (query, done) => {
      const options = _.pick(query, ['_id', 'name']);
      return User.patch(options, done);
    },
  })
);

/**
 * @api {put} /users/:id Put Existing User
 * @apiVersion 1.0.0
 * @apiName PutUser
 * @apiGroup User
 * @apiDescription Put existing user
 * @apiUse RequestHeaders
 * @apiUse User
 *
 * @apiUse RequestHeadersExample
 * @apiUse UserSuccessResponse
 */

router.put(
  PATH_SINGLE,
  putFor({
    put: (query, done) => {
      const options = _.pick(query, ['_id', 'name']);
      return User.put(options, done);
    },
  })
);

/**
 * @api {delete} /user/:id Delete Existing User
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup User
 * @apiDescription Delete existing user
 * @apiUse RequestHeaders
 * @apiUse User
 *
 * @apiUse RequestHeadersExample
 * @apiUse UserSuccessResponse
 */

router.delete(
  PATH_SINGLE,
  deleteFor({
    del: (query, done) => {
      const options = _.pick(query, '_id');
      return User.del(options, done);
    },
  })
);

module.exports = router;
