var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get('/', indexController.index);

router.post('/signup', indexController.signUp);

router.post('/login', indexController.login);

router.post('/logout', indexController.logout);

module.exports = router;
