const {
  getFor,
  schemaFor,
  //   downloadFor,
  getByIdFor,
  postFor,
  //   patchFor,
  //   putFor,
  //   deleteFor,
  Router,
} = require('@lykmapipo/express-rest-actions');
const { getString } = require('@lykmapipo/env');

const Topic = require('./topic.model');

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/topics/:id';
const PATH_LIST = '/topics';
// const PATH_EXPORT = '/topics/export';
const PATH_SCHEMA = '/topics/schema/';

const router = new Router({
  version: API_VERSION,
});

router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => Topic.get(options, done),
  })
);

router.get(
  PATH_SCHEMA,
  schemaFor({
    getSchema: (query, done) => {
      const jsonSchema = Topic.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

router.get(
  PATH_SINGLE,
  getByIdFor({
    getById: (options, done) => Topic.findById(options, done),
  })
);

router.post(
  PATH_LIST,
  postFor({
    post: (body, done) => {
      console.log(body);
      done();
    },
  })
);

module.exports = router;
