import axios from 'axios';
import { useEffect, useState } from 'react';

import RecipeList from './RecipeList';
import NavBar from './NavBar';
const FavoriteRecipes = (props) => {

    const {loggedIn, setLoggedIn} = props;
    const [recipeList, setRecipeList] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/favorite`, {withCredentials: true})
        .then(res => {
            console.log(res)
            setRecipeList(res.data);
        })
        .catch((err) => console.log(err));
    }, [])


    return (
        <div className="container">
            <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <h1>Your Favorite Recipes</h1>
            <RecipeList recipeList={recipeList}/>
        </div>
    )
}
export default FavoriteRecipes;