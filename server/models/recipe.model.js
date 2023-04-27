module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define("Recipe", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        instructions: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    Recipe.associate = (models) => {
        Recipe.belongsTo(models.User);
    };

    return Recipe;
}