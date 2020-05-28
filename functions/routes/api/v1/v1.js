const express = require("express");

const userController = require("../../../controllers/user-controller");

const router = express.Router();

router.post("/create-admin", userController.createAdmin);

module.exports = router;