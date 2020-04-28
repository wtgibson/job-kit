module.exports = function (sequelize, DataTypes) {
    var Company = sequelize.define("Company", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING,
            validate: {
                len:[5,5]
            }
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

