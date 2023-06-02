import { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import RecipeForm from './RecipeForm';
import '../styles/RecipeForm.css';

const CreateRecipe = (props) => {
    const {loggedIn, setLoggedIn} = props; 
    const navigate = useNavigate();

    const createRecipe = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('instructions', instructions);
        formData.append('imageFile', imageFile);
        ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}]`, ingredient);
        });
        console.log([...formData]);
        axios.post('http://localhost:8000/api/recipe', formData, {withCredentials: true, headers: {"Content-Type": "multipart/form-data"}})
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
                    <RecipeForm submitHandler={createRecipe}/>
                </div>
            </div>
        </div>
    )
}
export default CreateRecipe;