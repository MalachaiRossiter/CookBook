module.exports = (sequelize, DataTypes) => {
    const Favorites = sequelize.define("Favorites", {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
    });

    Favorites.associate = (models) => {
        Favorites.belongsTo(models.Recipe, { onDelete: 'CASCADE' });
        models.Recipe.hasMany(Favorites);

        Favorites.belongsTo(models.User, { onDelete: 'CASCADE' });
        models.User.hasMany(Favorites);
    };

    return Favorites;
};