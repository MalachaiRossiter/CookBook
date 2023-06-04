const validatePassword = (value) => {
    if (!/\d/.test(value)) {
        throw new Error('Password must contain at least one number');
    }
    if (!/[!@#$%^&*]/.test(value)) {
        throw new Error('Password must contain at least one symbol');
    }
};

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {msg: 'Someone has taken that username already'},
            validate: {
                len: {
                    args: [5, 25],
                    msg: 'Username must be between 5 and 25 characters'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {msg: "That email is already in use"},
            validate: {
                isEmail: {msg: "This is not an email"},
            }
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