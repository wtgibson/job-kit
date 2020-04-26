module.exports = function(sequelize, DataTypes) {
    var Contact = sequelize.define("Contact", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                len: [10,10]
            }
        },
        type: {
            type: DataTypes.STRING
        },
        
    });

    return Contact;
}