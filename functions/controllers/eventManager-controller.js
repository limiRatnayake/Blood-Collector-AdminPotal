const eventsController = {};

eventsController.webEventsPage = (req, res) => {
    res.render("event/event", {
        slug: "event",
        title: "Event",
        subTitle: "Event Management",
        hasTables: true,
        hasCharts: false
    })
}


module.exports = eventsController;