module.exports = function(sequelize, DataTypes) {
    var Contact = sequelize.define("Contact", {
        // First and Last Name
        name: {
            type: DataTypes.STRING
        },
        // Contact Email
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // Contact Phone
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Type of Contact - Recruiter, HR
        type: {
            type: DataTypes.STRING
        },
        
    });

    return Contact;
}