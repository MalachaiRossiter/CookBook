const { User } = require('..models/');

module.exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username)
    }
}