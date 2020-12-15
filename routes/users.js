var express = require('express');
const user_controller = require('../controllers/user_controller');
var router = express.Router();
const bookController = require('../controllers/user_controller');

/* GET routes */
router.get('/',user_controller.showLogin );
router.get('/logout',user_controller.logout);


/* POST routes */
router.post('/',user_controller.postLogin );
module.exports = router;
