const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_COOKIE;

module.exports.createUser = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (confirmPassword != password){
        return res.status(400).json({errors: [{message:'Passwords do not Match'}]});
    }

    //has the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create the user in the database
    User.create({username, email, password: hashedPassword})
    .then(user => {
        const payload = {id: user.id, email: user.email, username: user.username}
        const userToken = jwt.sign(payload, process.env.SECRET_COOKIE);
        res.cookie("usertoken", userToken, {expires: new Date(Date.now() + 9000000), httpOnly: true})
        .json({msg: "cookie obtained!", user: payload})
        res.status(200).json({message: 'User created sucessfully', user});
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

module.exports.deleteUser = (req, res) => {
    User.destroy({where: {id: req.params.id}})
    .then(user => {
        res.status(200).json({msg: "deleted user at " + user});
    })
    .catch(err => res.status(400).json(err))
}

