module.exports = function(sequelize, DataTypes) {
    var Source = sequelize.define("Source", {
        // Source of Apply: (referal, LinkedIn, etc.)
        source: {
            type: DataTypes.STRING
        },
        // URL to Posting Site
        linkToPosting: {
            type: DataTypes.STRING
        },
        // unique ID from job posting site
        jobID: {
            type: DataTypes.STRING
        },
        applyType: {
            type: DataTypes.STRING
        },
        resumeVersion: {
            type: DataTypes.STRING
        }
        
    });

    return Source;
}
