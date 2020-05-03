module.exports = function renderApplications(applications, res, partial) {
    if (partial === undefined) {
        return res.json(applications);
    }
    var newApplications = applications;
    // If a single object add to an array
    if (!Array.isArray(applications)) {
        newApplications = [applications];
    }


    var arrOfObjs = newApplications.map(element => ({
        id: element.dataValues.id,
        title: element.dataValues.title,
        type: element.dataValues.type,
        industry: element.dataValues.industry,
        zipCode: element.dataValues.zipCode,
        description: element.dataValues.description,
        salaryRange: element.dataValues.salaryRange,
        dateApplied: element.dataValues.dateApplied,
        rating: element.dataValues.rating,
        // createdAt: element.dataValues.createdAt,
        // updatedAt: element.dataValues.updatesAt,
        // companyName: element.dataValues.Company.dataValues.name,
        companyObj: element.dataValues.Company,
        contactObj: element.dataValues.Contacts,
        stageObj: element.dataValues.Stages,
        sourceObj: element.dataValues.Sources

    }));

    var hbsObj = {
        layout: false,
        applications: arrOfObjs
    }

    res.render(partial, hbsObj);
}