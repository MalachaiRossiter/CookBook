
const Favorite = sequelize.define('Favorite', {
    id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
    }
});

Favorite.belongsTo(Recipe);
Recipe.hasMany(Favorite);

Favorite.belongsTo(User);
User.hasMany(Favorite);