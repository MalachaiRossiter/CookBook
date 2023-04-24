const RecipesController = require('../controllers/recipe.controller')

module.exports = (app) => {
    app.post('/api/blog', RecipesController.createRecipe);
}