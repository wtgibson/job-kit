module.exports = function (sequelize, DataTypes) {
    var Application = sequelize.define("Application", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Industry: {
            type: DataTypes.STRING,
            defaultValue: "Technology"
        },
        // Multiple locations?
        zipcode: {
            type: DataTypes.INTEGER,
            validate: {
                len: [5, 5]
            }
        },
        salaryRange: {
            type: DataTypes.INTEGER
        },
        dateApplied: {
            type: DataTypes.STRING
        },
        currentStage: {
            type: DataTypes.STRING
        },
        dateCurrentStage: {
            type: DataTypes.STRING
        },
        companyContact: {
            // Name (first, last)
            type: DataTypes.STRING
        },
        contactType: {
            type: DataTypes.STRING
        },
        contactEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        nextSteps: {
            type: DataTypes.TEXT
        },
        notes: {
            type: DataTypes.TEXT
        },
        rating: {
            type: DataTypes.INTEGER
        },
        resumeVersion: {
            type: DataTypes.STRING
        },
        // URL to Posting Site
        linkToPosting: {
            type: DataTypes.STRING
        },
        // Source Posting Site
        source: {
            type: DataTypes.STRING
        },
        // unique ID from job posting site
        sourceID: {
            type: DataTypes.STRING
        },
        applyType: {
            type: DataTypes.STRING
        }
    });

    Application.associate = models => {
        models.Application.belongsTo(models.Company, {
            onDelete: "cascade"
        });
    }
}

