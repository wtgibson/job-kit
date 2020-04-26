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
        industry: {
            type: DataTypes.STRING,
            defaultValue: "Technology"
        },
        zipCode: {
            type: DataTypes.INTEGER,
            validate: {
                len: [5, 5]
            }
        },
        salaryRange: {
            type: DataTypes.INTEGER
        },
        rating: {
            type: DataTypes.INTEGER
        }
    });

    Application.associate = models => {
        models.Application.belongsTo(models.Company, {
            onDelete: "cascade"
        });
        models.Application.hasMany(models.Contact, {
            onDelete: "cascade"
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

