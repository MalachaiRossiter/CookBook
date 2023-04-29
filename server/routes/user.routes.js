const UsersController = require('../controllers/user.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/user', UsersController.getAllUsers);
    app.get('/api/user/:id', UsersController.getUser);
    app.post('/api/user', UsersController.createUser);
    app.delete('/api/user/:id', authenticate, UsersController.deleteUser);

    //logining in and out
    app.post('/api/user/login', UsersController.login);
    app.post('/api/user/logout', authenticate, UsersController.logout);

    //authentication for React - Check for Cookie
    app.post('/api/user/loginCheck', UsersController.loginCheck);
}