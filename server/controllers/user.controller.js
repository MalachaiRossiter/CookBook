const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username);

    //has the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //Validate the email using a regular expression
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({message: 'Invalid email'});
    }

    //Create the user in the database
    User.create({username, email, password: hashedPassword})
    .then(createdUser => {
        res.status(200).json({message: 'User created sucessfully', createdUser});
    })
    .catch(err => res.status(400).json(err));
}