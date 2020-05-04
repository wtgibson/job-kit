module.exports = function(sequelize, DataTypes) {
    var Stage = sequelize.define("Stage", {
        // Current Stage in Process
        currentStage: {
            type: DataTypes.STRING
        },
        // Date when current stage started
        dateCurrentStage: {
            type: DataTypes.STRING
        },
        // Next Step (if known)
        nextStep: {
            type: DataTypes.TEXT
        },
        // Notes for Current Stage
        notes: {
            type: DataTypes.TEXT
        }
        
    })


    Stage.association = models => {
        models.Stage.hasMany(models.Contact, {foreignKey: 'id'}, {

        });
    }
    return Stage;
}

