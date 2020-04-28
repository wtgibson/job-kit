module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jobTitle: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    });

    User.associate = models => {
        models.User.hasMany(models.Application, {foreignkey: 'id'}, {
            onDelete: "cascade"
        });

        models.User.hasMany(models.Company, {foreignkey: 'id'}, {
        });
    }
    return User;
}

