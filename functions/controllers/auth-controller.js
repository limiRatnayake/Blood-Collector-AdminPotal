const authController = {};

authController.webSignInPage = async(req, res) => {
    res.render("sign-in", {
        slug: "sign-in",
        title: "Sign In",
        subTitle: "Sign In",
        hasTables: false,
        hasCharts: false
    });
};

module.exports = authController;