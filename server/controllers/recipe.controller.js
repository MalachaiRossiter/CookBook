const { Recipe,Ingredients } = require('../models');
const jwt = require('jsonwebtoken');

module.exports.createRecipe = (req, res) => {
    const user = jwt.verify(req.cookies.usertoken, process.env.SECRET_COOKIE);
    const {title, description, instructions, ingredients} = req.body;
    Recipe.create({ title, description, instructions, UserId: user.id })
        .then(recipe => {
            const promises = ingredients.map(ingredient => {
                return Ingredients.create({ ingredient, RecipeId: recipe.id });
        });
        Promise.all(promises)
            .then(() => {
                res.status(200).json(recipe);
            })
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
};

module.exports.getAllRecipes = (req, res) => {
    Recipe.findAll()
    .then(recipes => {
        res.status(200).json(recipes);
    })
    .catch(err => res.status(400).json(err))
}

module.exports.getById = (req, res) => {
    Recipe.findByPk(req.params.id)
    .then(recipe => {
        res.status(200).json(recipe);
    })
    .catch(err => res.status(400).json(err))
}

module.exports.updateRecipe = (req, res) => {
    Recipe.update(req.body, {where: {id: req.params.id}})
    .then(updatedRecipe => {
        res.status(200).json({msg: "updated recipe at " + updatedRecipe});
    })
    .catch(err => res.status(400).json(err))
}

module.exports.deleteRecipe = (req, res) => {
    Recipe.destroy({where: {id: req.params.id}})
    .then(recipe => {
        res.status(200).json({msg: "deleted recipe at " + recipe});
    })
    .catch(err => res.status(400).json(err))
}