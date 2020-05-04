module.exports = function renderSource(sources, res, partial) {
    if (partial === undefined) {
        return res.json(sources);
    }
    var newSources = sources;
    // If a single object add to an array
    if (!Array.isArray(sources)) {
        newContacts = [sources];
    }
    var arrOfObjs = newSources.map(({ dataValues: { id, source, linkToPosting, JobID, applyType, resumeVersion } }) => ({
        id,
        source,
        linkToPosting,
        JobID,
        applyType,
        resumeVersion
    }));

    // console.log(arrOfObjs)
    var x = {
        layout: false,
        applications: arrOfObjs
    }

    // Partial: "partials/jobs/application-block"
    res.render(partial, x);
}