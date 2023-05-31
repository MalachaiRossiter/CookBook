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
                <div className="hero-image">
                    <img className={"recipe-image"} src={recipe.image} alt='Recipe' />
                </div>
            : null}
        </div>
    )
}
export default Recipe;