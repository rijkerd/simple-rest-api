const controller = require('../../controllers/user');

const Router = require('@lykmapipo/express-router-extra').Router;

const router = new Router({
    version: '1.0.0'
})

router.get('/users', controller.list);



// router.get('/register', )
// router.post('/register', controller.register)

router.route('/register').get(controller.register).post(controller.register)

module.exports = router;