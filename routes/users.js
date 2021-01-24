var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.get('/myprofile', userController.profileGet);

/* GET users listing. */
router.get("/connect", userController.connectGet);

router.get("/projects", userController.projectGet);
router.get("/myprojects", userController.myProject);
router.get("/createproject", userController.createproject);
router.post("/createproject", userController.project);
router.post("/myprojects/delete/:id", userController.projectDelete);
router.get("/myprojects/edit/:id", userController.projectEditGet);
router.post("/myprojects/edit/:id", userController.projectEdit);

router.get("/mybooks", userController.myBook);
router.get("/createbook", userController.createbook);
router.post("/createbook", userController.book);
router.get("/books", userController.bookGet);
router.post("/mybook/delete/:id", userController.bookDelete);
router.get("/mybook/edit/:id", userController.bookEditGet);
router.post("/mybook/edit/:id", userController.bookEdit);

router.post('/myprofile', userController.profile);

module.exports = router;
