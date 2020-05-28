const express = require("express");
const router = express.Router();

router.get("/events", (req, res) => {
    res.render("event/event", {
        slug: "event",
        title: "Event",
        subTitle: "Event Management",
        hasTables: true,
        hasCharts: false
    })
});

router.get("/users-view", (req, res) => {
    res.render("user/users-view", {
        slug: "users-view",
        title: "User View",
        subTitle: "User View",
        hasTables: true,
        hasCharts: false
    })
});

router.get("/add-users", (req, res) => {
    res.render("user/add-users", {
        slug: "add-user",
        title: "Add User",
        subTitle: "Add User",
        hasTables: true,
        hasCharts: false
    })
});


module.exports = router;