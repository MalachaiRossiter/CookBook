const UsersController = require('../controllers/user.controller')

module.exports = (app) => {
    app.get('/api/user', UsersController.getAllUsers);
    app.get('/api/user/:id', UsersController.getUser);
    app.post('/api/user', UsersController.createUser);
}