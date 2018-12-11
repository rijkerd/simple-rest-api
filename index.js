'use strict';


//dependencies
const app = require('@lykmapipo/express-common');
const mongoose = require('./middleware/mongoose');
//mount routers
app.mount('./routes', './routes/users');

app.use(mongoose.checkState);
//Database connection

//start app
app.start(function onStart(error, env) {
    console.log(env.PORT);
    console.log(env.NODE_ENV);
    console.log(`visit http://0.0.0.0:${env.PORT}/v1/`);
});