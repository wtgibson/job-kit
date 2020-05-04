module.exports = function renderStage(stages, res, partial) {
    if (partial === undefined) {
        return res.json(stages);
    }
    var newStages = stages;
    // If a single object add to an array
    if (!Array.isArray(stages)) {
        newStages = [stages];
    }
    var arrOfObjs = newStages.map(({dataValues: {id, currentStage, dateCurrentStage, nextStep, notes}}) => ({
        id,
        currentStage,
        dateCurrentStage,
        nextStep,
        notes
    }));

    // console.log(arrOfObjs)
    var x = {
        layout: false,
        applications: arrOfObjs
    }

    // Partial: "partials/jobs/application-block"
    res.render(partial, x);
}