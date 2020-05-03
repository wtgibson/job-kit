module.exports = function (sequelize, DataTypes) {
    var Company = sequelize.define("Company", {
        // Name of Company
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Location of Company
        zipCode: {
            type: DataTypes.STRING,
        },
        // Company URL
        URL: {
            type: DataTypes.STRING
        }
        

    });

    Company.associate = models => {
        models.Company.hasMany(models.Contact, {foreignkey: 'id'}, {
        });
        // models.Company.hasMany(models.Application, {foreignkey: 'id'}, {
        // });

    }
    return Company;
}

