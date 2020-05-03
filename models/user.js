// bcrypt is required to hash the user password.  
// var bcrypt = require("bcryptjs");

// Constructs the User model
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // User Email - used as username
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            // validate: {
                // isEmail: true
            // }
        },
        // password: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         len: [6]
        //     }
        // },

        // First and Last Name
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

    // // compares the unhashed password is from the USER to the hashed password in MySql
    // User.prototype.validPassword = function (password) {
    //     return bcrypt.compareSync(password, this.password);
    // };

    // // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // // In this case, before a User is created, we will automatically hash their password
    // User.addHook("beforeCreate", function (user) {
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    // });

    return User;
};


