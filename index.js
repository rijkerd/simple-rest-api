'use strict';

//dependencies
const { mount, start } = require('@lykmapipo/express-common');
const { connect } = require('@lykmapipo/mongoose-common');
const { fileRouter } = require('@lykmapipo/file');
const { getNumber, getString } = require('@lykmapipo/env');

const PORT = getNumber('PORT', 5000);
const MONGODB_URI = getString('MONGODB_URI');

connect(MONGODB_URI, (error) => error);

// make routes available for use
mount(fileRouter);
mount(require('./Topic/topic.http.router'));
mount(require('./User/user.http.router'));

start((error) => {
  if (error) {
    throw new Error(error);
  }
  console.log(`visit http://0.0.0.0:${PORT}/v1/`);
});
