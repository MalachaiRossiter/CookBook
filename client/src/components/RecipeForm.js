import { useState, useEffect} from 'react';

import '../styles/RecipeForm.css';

const RecipeForm = (props) => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [instructions, setInstructions] = useState();
    const [ingredients, setIngredients] = useState([]);

    const [newIngredient, setNewIngredient] = useState('');

    const handleNewIngredient = () => {
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        setNewIngredient('');
    }


    return(
        <div className='container'>
            <div className='row'>
                <div className='column1-2 background1'>
                </div>
                <div className='column1-2 background2'>
                    <form>
                        <h1>Get Creative</h1>
                        <div className='input-container'>
                            <label>Name Your Recipe</label>
                            <input type='text' onChange={(e) => setTitle(e.target.value)} className='form-input' placeholder={"Super Noodle Squad"}/>
                        </div>
                        <div className='input-container'>
                            <label>Describe the Dish</label>
                            <input type='text' onChange={(e) => setDescription(e.target.value)} className='form-input' placeholder={"Super Noodle Squad"}/>
                        </div>
                        <div className='input-container'>
                            <label>Name Your Recipe</label>
                            <textarea onChange={(e) => setInstructions(e.target.value)} className='form-input' placeholder={"Super Noodle Squad"}/>
                        </div>
                        <p></p>
                        <div class="input-ingredient">
                            <input type='text' value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} className='form-input' placeholder={"Enter a new ingredient"}/>
                            <button type='button' onClick={handleNewIngredient}>Add Ingredient</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default RecipeForm;