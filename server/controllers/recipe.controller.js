const Recipe = require('../models/recipe.model');

module.exports.createRecipe = (req, res) => {
    Recipe.create(req.body)
    .then(recipe => {
        res.json(recipe);
    })
    .catch((err) => { console.log(err) })
}