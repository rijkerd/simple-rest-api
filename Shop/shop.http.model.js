const _ = require('lodash');
const { Router, getFor, postFor } = require('@lykmapipo/express-rest-actions');
const { getString } = require('@lykmapipo/env');
const { uploaderFor } = require('@lykmapipo/file');

const API_VERSION = getString('API_VERSION', '1.0.0');
// const PATH_SINGLE = '/shops/:id';
const PATH_LIST = '/shops';
const SHOP_OWNER = '/shops/:owner';

const router = new Router({
  version: API_VERSION,
});

const Shop = require('./shop.model');

router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => Shop.get(options, done),
  })
);

router.post(
  PATH_LIST,
  uploaderFor(),
  postFor({
    post: (body, done) => {
      const options = _.pick(body, ['name', 'image', 'owner']);
      return Shop.post(options, done);
    },
  })
);

router.get(
  SHOP_OWNER,
  getFor({
    get: (options, done) => Shop.get(options, done),
  })
);

module.exports = router;
