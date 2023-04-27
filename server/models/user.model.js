module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 25]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    User.associate = (models) => {
        User.hasMany(models.Recipe);
    }

    return User;
}