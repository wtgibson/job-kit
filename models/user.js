
// Constructs the User model
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
        
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        zipCode: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len:[5,5]
            }
        },
        jobTitle: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        github: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        codingLanguage: {
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
};


