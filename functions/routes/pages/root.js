const express = require("express"); // use require function along with the name of the module

const router = express.Router();

router.get("/", (req, res) => {
   res.render("sign-in.ejs", {
      slug: "sign-in",
      title: "Sign In",
      subTitle: "Sign In",
      hasTables: false,
      hasCharts: false,
   });
});

router.get("/forget-password", (req, res) => {
   res.render("forget-password.ejs", {
      slug: "forget-password",
      title: "Forget Password",
      subTitle: "Forget Password",
      hasTables: false,
      hasCharts: false,
   });
});

module.exports = router;
