'use strict';


//dependencies
const app = require('@lykmapipo/express-common');
const mongoose = require('./middleware/mongoose');

app.mount('./routes/v1/');

app.use(mongoose.checkState);

app.start(function onStart(error, env) {
    console.log(`visit http://0.0.0.0:${env.PORT}/v1/`);
});