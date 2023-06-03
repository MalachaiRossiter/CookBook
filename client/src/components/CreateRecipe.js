import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import RecipeForm from './RecipeForm';
import NavBar from './NavBar';
import createRecipe from '../styles/createRecipe.css';

const CreateRecipe = (props) => {
    const {loggedIn, setLoggedIn} = props;
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const createRecipe = (formData) => {
    axios.post('http://localhost:8000/api/recipe', formData, 
    {withCredentials: true,headers: { 'Content-Type': 'multipart/form-data' }})
    .then((res) => {
        console.log(res.data);
        navigate('/');
    })
    .catch((err) => {
        console.log(err);
        const errorResponse = err.response.data.errors;
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
            errorArr.push(errorResponse[key].message);
            }
        setErrors(errorArr);
        });
    };

    return (
        <div className="container">
            <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <div className="row">
            <div className="column1-2 background1">
            </div>
            <div className="column1-2 background2">
                {errors.map((err, index) => (
                    <p key={index} className="error">
                        {err}
                    </p>
                ))}
                <RecipeForm submitHandler={createRecipe} />
            </div>
        </div>
    </div>
);
};

export default CreateRecipe;