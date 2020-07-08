const express = require("express");

const rootPageRoutes = require("./pages/root");
const mainPageRoutes = require("./pages/main");
const api = require("./api/api");

const router = express.Router();

router.use("/", rootPageRoutes);
router.use("/main", mainPageRoutes);
router.use("/api", api);

module.exports = router;