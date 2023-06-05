import axios from 'axios';
import { useEffect, useState } from 'react';

import RecipeList from './RecipeList';
import NavBar from './NavBar';
import recipeList from '../styles/recipeList.css';

const UserRecipes = (props) => {

    const {loggedIn, setLoggedIn} = props;
    const [recipeList, setRecipeList] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipe/user`, {withCredentials: true})
        .then(res => {
            console.log(res)
            setRecipeList(res.data);
        })
        .catch((err) => console.log(err));
    }, [])


    return (
        <div className="container">
            <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <div className='section-header'>
                <h1 className=''>Your Recipes</h1>
            </div>
            <RecipeList recipeList={recipeList}/>
        </div>
    )
}
export default UserRecipes;