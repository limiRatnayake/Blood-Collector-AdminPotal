const express = require("express");

//pages
const v1 = require("./v1/v1");

const router = express.Router();


router.use("/v1", v1);

module.exports = router;