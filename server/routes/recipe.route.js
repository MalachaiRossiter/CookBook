const RecipesController = require('../controllers/recipe.controller')
const multer = require('multer');

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
    app.get('/api/recipe', RecipesController.getAllRecipes);
    app.get('/api/recipe/:id', RecipesController.getById);
    app.get('/api/recipe/search/:search', RecipesController.getBySearch);
    app.post('/api/recipe', upload.single('imageFile'), RecipesController.createRecipe);
    app.put('/api/recipe/:id', RecipesController.updateRecipe);
    app.delete('/api/recipe/:id', RecipesController.deleteRecipe);
}