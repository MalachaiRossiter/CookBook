const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//LOGIN AND REGISTRATION USER

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
    })
    .catch(err => res.status(400).json(err));
}

//login check
module.exports.login = async(req, res) => {
    const user = await User.findOne({where: {email: req.body.email}});
    try{
        if(user === null) {
            console.log("user does not exist");
            return res.status(400).json({errors: [{message:'Invalid password/email'}]});
        } else {
            console.log('logging in: ' + user.username);
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
            if(!correctPassword){
                return res.status(400).json({errors: [{message:'Invalid password/email'}]});
            } else {
                const payload = {id: user.id, email: user.email, username: user.username}
                const userToken = jwt.sign(payload, process.env.SECRET_COOKIE);
                res.cookie("usertoken", userToken, {expires: new Date(Date.now() + 9000000), httpOnly: true})
                .json({ msg: "cookie obtained!", user: payload});
            }
        }   
    } catch (err) {
        res.status(400).json({errors: 'oops something went wrong when logging in'})
    }
}

module.exports.loginCheck = (req, res) => {
    jwt.verify(req.cookies.usertoken, process.env.SECRET_COOKIE, (err, payload) => {
        if (err) { 
            res.status(401).json({verified: false});
        } else {
            res.status(200).json({msg: "logged in"})
        }
    });
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    console.log("succesffuly logged out");
    res.sendStatus(200);
}

// GENERAL USER CRUD BELOW

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
