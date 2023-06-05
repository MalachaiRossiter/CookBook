import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import RecipeForm from './RecipeForm';
import NavBar from './NavBar';
import createRecipe from '../styles/createRecipe.css';

const UpdateRecipe = (props) => {
    const {loggedIn, setLoggedIn} = props;
    const {id} = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [recipe, setRecipe] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipe/${id}`)
        .then((res) => {
            setRecipe(res.data);
            console.log(recipe);
        })
        .catch((err) => {console.log(err)});
    }, [])

    const updateRecipe = (formData) => {
        axios.put(`http://localhost:8000/api/recipe/${id}`, formData, 
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
            <div className="column-left background1">
            </div>
            <div className="column-right background2">
                {errors.map((err, index) => (
                    <p key={index} className="error">
                        {err}
                    </p>
                ))}
                <RecipeForm submitHandler={updateRecipe} recipe={recipe}/>
            </div>
        </div>
    </div>
);
};

export default UpdateRecipe;