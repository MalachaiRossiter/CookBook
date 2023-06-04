module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define("Recipe", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Recipe title is required',
                },
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Recipe description is required',
                },
            },
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Recipe instructions are required',
                },
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Recipe image is required',
                },
            },
        },
    });

    Recipe.associate = (models) => {
        Recipe.belongsTo(models.User);
        Recipe.hasMany(models.Ingredients, { onDelete: 'CASCADE', hooks: true });
    };

    return Recipe;
};