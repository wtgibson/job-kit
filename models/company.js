module.exports = function (sequelize, DataTypes) {
    var Company = sequelize.define("Company", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // we are expecting to receive all types of text now under location
        zipCode: {
            type: DataTypes.STRING,
        },
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

