var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get('/', userController.index);

router.get('/profile', userController.profileGet);
router.post('/profile', userController.profile);

router.post('/project', userController.project);
router.get('/project', userController.projectGet);
router.get('/myproject', userController.myProject);
router.post('/myproject/delete/:id', userController.projectDelete);
router.get('/myproject/edit/:id', userController.projectEdit);

router.post('/book', userController.book);
router.get('/book', userController.bookGet);
router.get('/mybook', userController.myBook);
router.post('/mybook/delete/:id', userController.bookDelete);
router.get('/mybook/edit/:id', userController.bookEdit);

router.get('/connect', userController.connectGet);

module.exports = router;
