const controller = require('../../controllers/user');

const Router = require('@lykmapipo/express-router-extra').Router;

const router = new Router({
    version: '1.0.0'
});

router.get('/users', controller.list);

router.post('/register', controller.register);

module.exports = router;