module.exports = function(sequelize, DataTypes) {
    var Recruiter = sequelize.define("Recruiter", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        name: {
            type: DataTypes.STRING
        },
        // Internal/ External Recruiter
        connection: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                len: [10,10]
            }
        }
    })


    Recruiter.association = models => {
        models.Recruiter.hasMany(models.Application, {foreignKey: 'id'}, {
            onDelete: "cascade"
        });
    
        models.Recruiter.hasMany(models.Company, {foreignKey: 'id'} {
            onDelete: "cascade"
        })
    }
    return Recruiter;
}

