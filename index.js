'use strict';


//dependencies
const app = require('@lykmapipo/express-common');
const mongoose = require('./middleware/mongoose');
require('dotenv');


// make routes available for use
app.mount('./routes/v1/');


// connect to mongodb
app.use(mongoose.checkState);


// incase of 404 return to the /v1
app.use(function (req, res, next) {
    return res.status(404).redirect('/v1');
});

app.start(function onStart(error, env) {
    console.log(`visit http://0.0.0.0:${env.PORT}/v1/`);
});