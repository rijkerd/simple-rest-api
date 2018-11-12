'use strict';


//dependencies
const Router = require('@lykmapipo/express-router-extra').Router;
const router = new Router({ version: '1.0.0' });

router.get('/\.:ext?', function (request, response) {
    response.json({
        "mode": process.env.NODE_ENV,
        "message": "Hello World"
    });
});


module.exports = router;