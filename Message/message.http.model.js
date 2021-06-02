const _ = require('lodash');
const {
  getFor,
  deleteFor,
  postFor,
  Router,
} = require('@lykmapipo/express-rest-actions');
const { getString } = require('@lykmapipo/env');

const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/messages/:id';
const PATH_LIST = '/messages';

const Message = require('./message.model');

const router = new Router({
  version: API_VERSION,
});

router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => Message.get(options, done),
  })
);

router.post(
  PATH_LIST,
  postFor({
    post: (body, done) => {
      const options = _.pick(body, ['time', 'text', 'isLiked', 'senderId']);
      return Message.post(options, done);
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
