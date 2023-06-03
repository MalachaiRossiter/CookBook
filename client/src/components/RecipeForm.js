import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeForm from '../styles/recipeForm.css';

const RecipeForm = (props) => {
    const { submitHandler, recipe } = props; // Accept recipe object as prop if it's an update

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
    if (recipe) {
        console.log(recipe);
        // If recipe object is provided, populate the form fields with its values
        setTitle(recipe.title);
        setDescription(recipe.description);
        setInstructions(recipe.instructions);
        setIngredients(recipe.Ingredients.map((ingredient) => ingredient.ingredient));
    }
    }, [recipe]);

    const handleNewIngredient = () => {
        setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
        setNewIngredient('');
    };

    const handleRemoveIngredient = (indexToRemove) => {
        setIngredients((prevIngredients) =>
        prevIngredients.filter((_, index) => index !== indexToRemove)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('instructions', instructions);
        formData.append('imageFile', imageFile);
        ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}]`, ingredient);
        });
        submitHandler(formData);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="recipe-form">
                <h1>Get Creative</h1>
                {errors.map((err, index) => (
                <p key={index} className="error">
                    {err}
                </p>
                ))}
                <div className="input-container">
                    <label>Name Your Recipe</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input recipe-descriptors" placeholder="Tasty Yum Yum Sauce"/>
                </div>
                <div className="input-container">
                    <label>Describe the Dish</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-input recipe-descriptors" placeholder="You'll never believe it's awesomeness!"/>
                </div>
                <div className="input-container">
                    <label>Instructions</label>
                    <textarea value={instructions} rows={10} onChange={(e) => setInstructions(e.target.value)} className="form-input recipe-descriptors" id="create-recipe-textarea" placeholder="Just whip around and Spin"/>
                </div>
                    <label>Ingredients</label>
                <div className="input-ingredient">
                    <input type="text" value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} className="form-input" placeholder="Enter a new ingredient"/>
                    <button type="button" className="submit-btn" id="recipe-submit-btn" onClick={handleNewIngredient}>Add Ingredient</button>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                        <li key={index} onClick={() => handleRemoveIngredient(index)} id="ingredient">
                            {ingredient}
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="input-container">
                    <label>Upload an Image</label>
                    <input type="file" id="file-submit-btn" onChange={(e) => setImageFile(e.target.files[0])} accept="image/*"/>
                </div>
                    <input type="submit" className="submit-btn" />
            </form>
        </div>
    );
};
export default RecipeForm;