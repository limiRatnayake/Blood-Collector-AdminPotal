const userManagerController = {};

userManagerController.webUsersPage = (req, res) => {
    res.render("user/user", {
        slug: "user",
        title: "User",
        subTitle: "User Management",
        hasTables: true,
        hasCharts: false
    })
}

module.exports = userManagerController;