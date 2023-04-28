const { Recipe } = require('../models');

module.exports.createRecipe = (req, res) => {
    Recipe.create(req.body)
    .then(recipe => {
        res.status(200).json(recipe);
    })
    .catch(err => res.status(400).json(err))
}

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
        res.status(200).json({msg: "deleted recipe at " + req.params.id});
    })
    .catch(err => res.status(400).json(err))
}