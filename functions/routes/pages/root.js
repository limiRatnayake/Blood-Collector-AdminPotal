const express = require("express"); // use require function along with the name of the module

const authController = require("../../controllers/auth-controller");

const router = express.Router();

router.get("/", authController.webSignInPage);


module.exports = router;