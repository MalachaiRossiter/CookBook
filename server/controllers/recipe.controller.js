const { Recipe, Ingredients, User, Sequelize } = require('../models');
const jwt = require('jsonwebtoken');
const { v4: uuidv4} = require('uuid');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports.createRecipe = (req, res) => {
    const user = jwt.verify(req.cookies.usertoken, process.env.SECRET_COOKIE);
    const {title, description, instructions, ingredients} = req.body;
    // Check if image file is present in the request
    if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
    }
    // Check image dimensions
    sharp(req.file.path)
        .metadata()
        .then(metadata => {
            const { width, height } = metadata;
            if (width < 700 || height < 400) {
                // Delete the invalid image file
                fs.unlinkSync(req.file.path);
                return res.status(400).json({ error: 'Image dimensions should be at least 700 x 400 pixels' });
            }
            // Generate a unique filename
            const fileName = `${uuidv4()}${path.extname(req.file.originalname)}`;
            // Move the uploaded image file to the desired directory
            fs.renameSync(req.file.path, `recipeImages/${fileName}`);
            // Save the recipe details and the filename in the database
            Recipe.create({ title, description, instructions, image: fileName, UserId: user.id })
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
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Failed to process the image' });
    });
};

module.exports.getAllRecipes = (req, res) => {
    Recipe.findAll({
        include: [
            { model: User, attributes: ['username'] }
        ]
    })
    .then(recipes => {
        const recipesWithImages = recipes.map(recipe => {
            const imageUrl = `${req.protocol}://${req.get('host')}/recipeImages/${recipe.image}`;
            return {
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                instructions: recipe.instructions,
                image: imageUrl,
                user: recipe.User,
                ingredients: recipe.Ingredients
            };
        });
        res.status(200).json(recipesWithImages);
    })
    .catch(err => {
        console.error(err);
        res.status(400).json({error: 'Failed to get Recipes'});
    });
}

module.exports.getById = (req, res) => {
    Recipe.findByPk(req.params.id,
        {
            include: [
                { model: Ingredients, attributes: ['ingredient'] },
                { model: User, attributes: ['username'] }
            ]
        })
    .then(recipe => {
        const imageUrl = `${req.protocol}://${req.get('host')}/recipeImages/${recipe.image}`;
        recipe.image = imageUrl;
        res.status(200).json(recipe);
    })
    .catch(err => res.status(400).json(err))
}

module.exports.getBySearch = (req, res) => {
    console.log(req.params.search);
    Recipe.findAll({
        where: {
            title: {
                [Sequelize.Op.like]: `%${req.params.search}%`
            }
        },
        include: [
            { model: User, attributes: ['username'] }
        ]
    })
    .then(recipes => {
        console.log(recipes);
        const recipesWithImages = recipes.map(recipe => {
            const imageUrl = `${req.protocol}://${req.get('host')}/recipeImages/${recipe.image}`;
            return {
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                instructions: recipe.instructions,
                image: imageUrl,
                user: recipe.User,
                ingredients: recipe.Ingredients
            };
        });
        res.status(200).json(recipesWithImages);
    })
    .catch(err => {
        console.error(err);
        res.status(400).json({error: 'Failed to get Recipes'});
    });
}

module.exports.getByUser = (req, res) => {
    const user = jwt.verify(req.cookies.usertoken, process.env.SECRET_COOKIE);
    console.log(user);
    Recipe.findAll({
        where: {
            UserId: user.id
        },
        include: [
            { model: User, attributes: ['username'] }
        ]
    })
    .then(recipes => {
        console.log(recipes);
        const recipesWithImages = recipes.map(recipe => {
            const imageUrl = `${req.protocol}://${req.get('host')}/recipeImages/${recipe.image}`;
            return {
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                instructions: recipe.instructions,
                image: imageUrl,
                user: recipe.User,
                ingredients: recipe.Ingredients
            };
        });
        res.status(200).json(recipesWithImages);
    })
    .catch(err => {
        console.error(err);
        res.status(400).json({error: 'Failed to get Recipes'});
    });
}

module.exports.updateRecipe = (req, res) => {
    Recipe.update(req.body, {where: {id: req.params.id}})
    .then(updatedRecipe => {
        res.status(200).json({msg: "updated recipe at " + updatedRecipe});
    })
    .catch(err => res.status(400).json(err))
}

module.exports.deleteRecipe = (req, res) => {
    const user = jwt.verify(req.cookies.usertoken, process.env.SECRET_COOKIE);
    Recipe.findByPk(req.params.id)
        .then(recipe => {
        if (recipe.UserId !== user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const imageUrl = `${req.protocol}://${req.get('host')}/recipeImages/${recipe.image}`;
        const imagePath = path.join(__dirname, '../recipeImages', recipe.image);
        // Delete the image file from the server
        fs.unlink(imagePath, err => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete image' });
        } else {
            // Image file deleted successfully, now delete the recipe
            Recipe.destroy({
                where: {
                    id: req.params.id
                }, include: [
                    {model: Ingredients}
                ]
            })
            .then(() => {
                res.status(200).json({ msg: 'Recipe deleted successfully' });
            })
            .catch(err => res.status(500).json({ error: 'Failed to delete recipe' }));
        }
        });
    })
    .catch(err => res.status(400).json({ error: 'Recipe not found' }));
};