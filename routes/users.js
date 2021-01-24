var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get('/connect', userController.connect);

router.get('/projects', userController.projects);
router.get('/myprojects', userController.myprojects);
router.get('/createproject', userController.createproject);

router.get('/books', userController.books);
router.get('/mybooks', userController.mybooks);
router.get('/createbook', userController.createbook);

module.exports = router;
