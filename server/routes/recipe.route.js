const RecipesController = require('../controllers/recipe.controller')

module.exports = (app) => {
    app.get('/api/recipe', RecipesController.getAllRecipes);
    app.get('/api/recipe/:id', RecipesController.getById);
    app.post('/api/recipe', RecipesController.createRecipe);
    app.put('/api/recipe/:id', RecipesController.updateRecipe);
    app.delete('/api/recipe/:id', RecipesController.deleteRecipe);
}