var db = require("../models");

module.exports = function (app) {
    // Get All Stages with Current Stage
    app.get("/api/user/:userId/stage/filter/currentStage/:currentStage", (req, res) => {
        db.Stage.findAll({
            where: {userId: req.params.userId, currentStage: req.params.currentStage},
        }).then(stages => {
            res.json(stages);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });
}