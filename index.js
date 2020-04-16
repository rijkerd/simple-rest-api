'use strict';

//dependencies
const { mount, start } = require('@lykmapipo/express-common');
const { connect } = require('@lykmapipo/mongoose-common');
const { getNumber, getString } = require('@lykmapipo/env');

const PORT = getNumber('PORT', 5000);
const MONGODB_URI = getString('MONGODB_URI');

connect(MONGODB_URI, (error) => error);

// make routes available for use
mount(require('./routes/v1'));

start((error) => {
  if (error) {
    throw new Error(error);
  }
  console.log(`visit http://0.0.0.0:${PORT}/v1/`);
});
