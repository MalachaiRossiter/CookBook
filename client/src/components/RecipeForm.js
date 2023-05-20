import { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../styles/RecipeForm.css';

const RecipeForm = (props) => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [instructions, setInstructions] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleNewIngredient = () => {
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        setNewIngredient('');
    }

    const handleRemoveIngredient = (indexToRemove) => {
        setIngredients((prevIngredients) =>
            prevIngredients.filter((_, index) => index !== indexToRemove));
        };

    const createRecipe = (e) =>{
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('title', title);
        // console.log(formData.title);
        // formData.append('description', description);
        // formData.append('instructions', instructions);
        // formData.append('imageFile', imageFile);
    
        // ingredients.forEach((ingredient, index) => {
        //     formData.append(`ingredients[${index}]`, ingredient);
        // });
        const newRecipe = {title, description, instructions, ingredients, imageFile};
        console.log(newRecipe);
        axios.post('http://localhost:8000/api/recipe', newRecipe, {withCredentials: true, headers: {"Content-Type": "multipart/form-data"}})
        .then(res => {
            console.log(res.data);
            navigate('/');
        })
        .catch((err) => {
            console.log(err)
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        });
        }

    return(
        <div className='container'>
            <div className='row'>
                <div className='column1-2 background1'>
                </div>
                <div className='column1-2 background2'>
                    <form onSubmit={createRecipe}>
                        <h1>Get Creative</h1>
                        {errors.map((err, index) => <p key={index} className="error">{err}</p>)}
                        <div className='input-container'>
                            <label>Name Your Recipe</label>
                            <input type='text' onChange={(e) => setTitle(e.target.value)} className='form-input' placeholder={"Super Noodle Squad"}/>
                        </div>
                        <div className='input-container'>
                            <label>Describe the Dish</label>
                            <input type='text' onChange={(e) => setDescription(e.target.value)} className='form-input' placeholder={"Super Noodle Squad"}/>
                        </div>
                        <div className='input-container'>
                            <label>Instructions</label>
                            <textarea onChange={(e) => setInstructions(e.target.value)} className='form-input' placeholder={"Super Noodle Squad"}/>
                        </div>
                        <label>Ingredients</label>
                        <div className="input-ingredient">
                            <input type='text' value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} className='form-input' placeholder={"Enter a new ingredient"}/>
                            <button type='button' onClick={handleNewIngredient}>Add Ingredient</button>
                        </div>
                        <div className='input-container'>
                            <ul>
                                {ingredients.map((ingredient, index) => (
                                <li key={index}>
                                {ingredient}{' '}
                                <button onClick={() => handleRemoveIngredient(index)}>
                                Remove
                                </button>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className='input-container'>
                            <label>Upload an Image</label>
                            <input type='file' onChange={(e) => setImageFile(e.target.files[0])} className='form-input' accept="image/*" />
                        </div>
                        <input type="submit" className='submit-btn'/>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default RecipeForm;