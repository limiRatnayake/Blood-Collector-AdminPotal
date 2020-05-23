const express = require("express");

const rootPageRoutes = require("./pages/root");
const mainPageRoutes = require("./pages/main")

const router = express.Router();

router.use("/", rootPageRoutes);
router.use("/main", mainPageRoutes);


module.exports = router;