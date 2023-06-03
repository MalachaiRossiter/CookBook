import { useState, useEffect } from 'react';

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
        // If recipe object is provided, populate the form fields with its values
        setTitle(recipe.title);
        setDescription(recipe.description);
        setInstructions(recipe.instructions);
        setIngredients(recipe.ingredients);
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
            <form onSubmit={handleSubmit}>
                <h1>Get Creative</h1>
                {errors.map((err, index) => (
                <p key={index} className="error">
                    {err}
                </p>
                ))}
                <div className="input-container">
                    <label>Name Your Recipe</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" placeholder="Super Noodle Squad"/>
                </div>
                <div className="input-container">
                    <label>Describe the Dish</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-input" placeholder="Super Noodle Squad"/>
                </div>
                <div className="input-container">
                    <label>Instructions</label>
                    <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} className="form-input" placeholder="Super Noodle Squad"/>
                </div>
                    <label>Ingredients</label>
                <div className="input-ingredient">
                    <input type="text" value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} className="form-input" placeholder="Enter a new ingredient"/>
                    <button type="button" onClick={handleNewIngredient}>Add Ingredient</button>
                </div>
                <div className="input-container">
                    <ul>
                        {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient}{' '}
                            <button onClick={() => handleRemoveIngredient(index)}>Remove</button>
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="input-container">
                    <label>Upload an Image</label>
                    <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="form-input" accept="image/*"/>
                </div>
                    <input type="submit" className="submit-btn" />
            </form>
        </div>
    );
};
export default RecipeForm;