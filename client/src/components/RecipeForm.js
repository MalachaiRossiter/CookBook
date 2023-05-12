import { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../styles/RecipeForm.css';

const RecipeForm = (props) => {
    const {submitHandler, id} = props;
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [instructions, setInstructions] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const [newIngredient, setNewIngredient] = useState('');

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
        const newRecipe = ({title, description, instructions, ingredients});
        console.log(newRecipe);
        axios.post('http://localhost:8000/api/recipe', newRecipe, {withCredentials: true}) //make sure this is correct rotue
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
                        <input type="submit" className='submit-btn'/>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default RecipeForm;