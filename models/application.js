module.exports = function (sequelize, DataTypes) {
    var Application = sequelize.define("Application", {
        // Job Title - "Software Engineer"
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // Full-time, Part-time, Contract
        type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // Job Description
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        // Industry of Company
        industry: {
            type: DataTypes.STRING,
            defaultValue: "Technology"
        },
        // Job Location
        zipCode: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [5, 5]
            }
        },
        // Salary Range
        salaryRange: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // Date Applied - 
        // set to Now() if applying on jobs tab
        dateApplied: {
            type: DataTypes.STRING
        },
        // Rating for Job using emojis (1-5)
        rating: {
            type: DataTypes.INTEGER
        }
    });

    Application.associate = models => {
        models.Application.hasOne(models.Company, {
        });
        
        models.Application.hasMany(models.Contact, {

        });
        models.Application.hasMany(models.Stage, {
            onDelete: "cascade"
        });
        models.Application.hasMany(models.Source, {
            onDelete: "cascade"
        });
    }
    return Application;
}

