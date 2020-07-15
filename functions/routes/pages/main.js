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

router.get("/user-data-view", (req, res) => {
    res.render("user/user-data-view", {
        slug: "user-data-view",
        title: "Admin User View",
        subTitle: "Admin User View",
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

router.get("/add-hospitals", (req, res) => {
    res.render("hospital-list/add-hospitals", {
        slug: "add-hospitals",
        title: "Add Hospitals",
        subTitle: "Add Hospitals",
        hasTables: true,
        hasCharts: false
    })
});

router.get("/user-profile", (req, res) => {
    res.render("user/user-profile", {
        slug: "user-profile",
        title: "User Profile",
        subTitle: "User profile",
        hasTables: true,
        hasCharts: false
    })
});

module.exports = router;