
// Constructs the User model
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // User Email - used as username
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
        // User Current Zipcode -
        // used to locate new job opportunities 
        zipCode: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len:[5,5]
            }
        },
        // Currently seeking jobs with this jobTitle
        jobTitle: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // GitHub Username - populates user image
        github: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Currently seeking jobs in this language
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


