const RecipesController = require('../controllers/recipe.controller');
const {authenticate} = require('../config/jwt.config');
const multer = require('multer');
const express = require('express');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../recipeImages/');
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname;
        cb(null, originalName)
    }
});

const fileFilter = function (req, file, cb) {
        // Check file type
        if (file.mimetype.startsWith('image/')) {
            // Accept the file
            cb(null, true);
        } else {
            // Reject the file
            cb(new Error('Only image files are allowed'));
        }
    };

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Adjust the file size limit as per your requirements (5MB in this example)
    }
});

module.exports = (app) => {
    app.use('/recipeImages', express.static(path.join(__dirname, '../recipeImages')));

    //get recipe from database
    app.get('/api/recipe', RecipesController.getAllRecipes);
    app.get('/api/recipe/user', authenticate, RecipesController.getByUser);
    app.get('/api/recipe/:id', RecipesController.getById);
    app.get('/api/recipe/search/:search', RecipesController.getBySearch);

    //change/add recipe in database
    app.post('/api/recipe', upload.single('imageFile'), authenticate, RecipesController.createRecipe);
    app.put('/api/recipe/:id', upload.single('imageFile'), authenticate, RecipesController.updateRecipe);
    app.delete('/api/recipe/:id', authenticate, RecipesController.deleteRecipe);

    //favorite a recipe
    app.get('/api/favorite/:id', authenticate, RecipesController.toggleFavoriteRecipe);
}