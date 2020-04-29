var db = require("../models");

module.exports = function (app) {
    // Get All Stages with Current Stage
    // * Filter by User
    app.get("/api/stage/filter/currentStage/:currentStage", (req, res) => {
        db.Stage.findAll({
            where: {
                currentStage: req.params.currentStage
            },
        }).then(stages => {
            res.json(stages);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });
}