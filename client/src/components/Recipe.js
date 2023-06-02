import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios';

import recipe from '../styles/recipe.css'

import NavBar from "./NavBar";

const Recipe = (props) => {
    const { loggedIn, setLoggedIn } = props;
    const { id } = useParams();
    const [user, setUser] = useState();
    const [recipe, setRecipe] = useState();
    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipe/${id}`)
        .then(res => {
            setRecipe(res.data);
            console.log(recipe);
            setLoaded(true);
            if (loggedIn) {
                axios.get(`http://localhost:8000/api/user/userInfo`, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                    setUser(res.data);
                    console.log(user);
                })
                .catch((err) => { console.log(err) })
            }
        })
        .catch((err) => { console.log(err) });
    }, [])

    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/recipe/${id}`, {withCredentials: true})
        .then(res => {
            console.log("Item deleted successfully!");
            navigate("/");
        })
        .catch(err => {
            console.log("Error deleting item:", err);
        });
    };

    return (
        <div className="container">
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
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
                {loggedIn && user && (recipe.UserId === user.id) ?
                    <div className="options-container">
                        <button className="option-btn" id="favorite">Favorite</button>
                        <button className="option-btn" id="edit">Edit</button>
                        <button className="option-btn" id="delete" onClick={handleDelete}>Delete</button>
                    </div>
                    : 
                    <div className="options-container">
                        <button className="option-btn">Favorite</button>
                    </div>
                    }
            </div>
        : null}
    </div>
    )
}
export default Recipe;