const RecipesController = require('../controllers/recipes.controllers')

module.exports = (app) => {
    app.post('/api/blog', RecipesController.createRecipe);
}