module.exports = (sequelize, DataTypes) => {
    
    const Favorites = sequelize.define('Favorite', {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
    });

    Favorites.associate = (models) => {
        Favorites.belongsTo(models.Recipe);
        models.Recipe.hasMany(Favorites);

        Favorites.belongsTo(models.User);
        models.User.hasMany(Favorites);
    };

    return Favorites;
}