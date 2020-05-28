const express = require("express"); // use require function along with the name of the module


const router = express.Router();

router.get("/", (req, res) => {
    res.render("sign-in", {
        slug: "sign-in",
        title: "Sign In",
        subTitle: "Sign In",
        hasTables: false,
        hasCharts: false
    });
});

router.get("/sign-up", (req, res) => {
    res.render("sign-up", {
        slug: "sign-up",
        title: "Sign Up",
        subTitle: "Sign Up",
        hasTables: false,
        hasCharts: false
    });
});


module.exports = router;