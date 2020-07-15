const express = require("express");

const router = express.Router();


// USER
router.post("/disabled", require("../../models/user-model"));
// router.post("/update-profile", require("../../models/user-profile-model"));

module.exports = router;