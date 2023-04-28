const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username);

    //has the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create the user in the database
    User.create({username, email, password: hashedPassword})
    .then(createdUser => {
        res.status(200).json({message: 'User created sucessfully', createdUser});
    })
    .catch(err => res.status(400).json(err));
}

module.exports.getAllUsers = (req, res) => {
    User.findAll()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => res.status(400).json(err))
}

module.exports.getUser = (req, res) => {
    User.findByPk(req.params.id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => res.status(400).json(err))
}