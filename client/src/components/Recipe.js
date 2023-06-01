import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

import recipe from '../styles/recipe.css'

import NavBar from "./NavBar";


const Recipe = (props) => {
    const {loggedIn, setLoggedIn} = props;
    const {id} = useParams();
    const [recipe, setRecipe] = useState();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipe/${id}`)
        .then(res => {
            setRecipe(res.data);
            console.log(recipe)
            setLoaded(true);
        })
        .catch((err) => {console.log(err)});
    }, [])

    return (
        <div className="container">
            <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            {loaded ? 
                    <div className="recipe-container">
                        <img className={"recipe-image"} src={recipe.image} alt='Recipe' />
                        <div className="recipe-text-container">
                            <h1>{recipe.title}</h1>
                            <h2>{recipe.description}</h2>
                            <h4>Instrcutions:</h4>
                            <p>{recipe.instructions}</p>
                            <h4>Ingredients:</h4>
                            <ul>
                            {recipe.Ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.ingredient}</li>
                            ))}
                            </ul>
                        </div>
                    </div>

            : null}
        </div>
    )
}
export default Recipe;