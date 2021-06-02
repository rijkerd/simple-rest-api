const _ = require('lodash');
const {
  getFor,
  deleteFor,
  postFor,
  Router,
} = require('@lykmapipo/express-rest-actions');
const { getString } = require('@lykmapipo/env');
const { uploaderFor } = require('@lykmapipo/file');

const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/products/:id';
const PATH_LIST = '/products';

const Product = require('./product.model');

const router = new Router({
  version: API_VERSION,
});

router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => Product.get(options, done),
  })
);

router.post(
  PATH_LIST,
  uploaderFor(),
  postFor({
    post: (body, done) => {
      const options = _.pick(body, ['name', 'image', 'price', 'shop']);
      return Product.post(options, done);
    },
  })
);

router.delete(
  PATH_SINGLE,
  deleteFor({
    del: (query, done) => {
      const options = _.pick(query, '_id');
      return Product.del(options, done);
    },
  })
);

module.exports = router;
