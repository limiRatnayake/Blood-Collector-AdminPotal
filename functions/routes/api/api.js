//import express framework into this project
const express = require("express");

const router = express.Router();

// USER
router.post("/disabled", require("../../models/user-model"));
router.post("/add-admin-user", require("../../models/user-add-model"));

module.exports = router;
