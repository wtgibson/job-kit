var db = require("../models");

module.exports = function (app) {

    // Get Title, ZipCode, Rating
    app.get("/api/user/:userId/application/filter/title/:title", (req, res) => {
        db.Application.findAll({
            where: {userId: req.params.userId, title: req.params.title},
            include: {
                model: db.Company,
                model: db.Contact,
                model: db.Source,
                model: db.Stage
            },
        }).then(applications => {
            var arrayOfColValues = applications.map(application => application[req.params.field])
            res.render("index", arrayOfColValues);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Filter on Source

    // Filter on Stage

    // Filer on Company
}