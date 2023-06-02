module.exports = (sequelize, DataTypes) => {
    const Ingredients = sequelize.define("Ingredients", {
        ingredient: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    Ingredients.associate = (models) => {
        Ingredients.belongsTo(models.Recipe, {onDelete: 'CASCADE', hooks: true });
    }

    return Ingredients;
}