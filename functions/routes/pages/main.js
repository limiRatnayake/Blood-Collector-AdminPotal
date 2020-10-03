//import express framework into this project
const express = require("express");
//create a modular with express.router class
//create a router as module
const router = express.Router();

//listen to the req that match specific route(Url) & http req methods
//define some routes
router.get("/events", (req, res) => {
   res.render("event/event.ejs", {
      slug: "event",
      title: "Event",
      subTitle: "Event Management",
      hasTables: true,
      hasCharts: false,
   });
});

router.get("/all-user-data-view", (req, res) => {
   res.render("user/all-user-data-view.ejs", {
      slug: "all-user-data-view",
      title: "All User View",
      subTitle: "All User View",
      hasTables: true,
      hasCharts: false,
   });
});

router.get("/admin-user-data-view", (req, res) => {
   res.render("user/admin-user-data-view.ejs", {
      slug: "admin-user-data-view",
      title: "Admin User View",
      subTitle: "Admin User View",
      hasTables: true,
      hasCharts: false,
   });
});

router.get("/users-data-view", (req, res) => {
   res.render("user/users-data-view.ejs", {
      slug: "users-data-view",
      title: "Users View",
      subTitle: "Users View",
      hasTables: true,
      hasCharts: false,
   });
});

router.get("/add-users", (req, res) => {
   res.render("user/add-users.ejs", {
      slug: "add-user",
      title: "Add User",
      subTitle: "Add User",
      hasTables: true,
      hasCharts: false,
   });
});

router.get("/add-hospitals", (req, res) => {
   res.render("hospital-list/add-hospitals.ejs", {
      slug: "add-hospitals",
      title: "Add Hospitals",
      subTitle: "Add Hospitals",
      hasTables: true,
      hasCharts: false,
   });
});

router.get("/user-profile", (req, res) => {
   res.render("user/user-profile.ejs", {
      slug: "user-profile",
      title: "User Profile",
      subTitle: "User profile",
      hasTables: true,
      hasCharts: false,
   });
});
//mounts the router module on a path in the main app.
module.exports = router;
