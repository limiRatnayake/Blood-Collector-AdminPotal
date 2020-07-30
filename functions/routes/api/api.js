const express = require("express");

const router = express.Router();


// USER
router.post("/disabled", require("../../models/user-model"));

module.exports = router;