const express = require("express");
const userManagerController = require("../../controllers/userManager-controller");
const eventsManagerController = require("../../controllers/eventManager-controller");

const router = express.Router();

router.get("/events", eventsManagerController.webEventsPage);

router.get("/users", userManagerController.webUsersPage);


module.exports = router;