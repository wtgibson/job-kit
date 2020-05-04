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
        // Type of Apply - OneClick, Referral
        applyType: {
            type: DataTypes.STRING
        },
        // Resume Version or Number (used to apply at this source)
        resumeVersion: {
            type: DataTypes.STRING
        }
        
    });

    return Source;
}
