import NavBar from './NavBar';
import home from '../styles/home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = (props) => {

    const {loggedIn, setLoggedIn} = props;

    const [recipeList, setRecipeList] = useState();
    const [searchText, setSearchText] = useState();

    const submitHandler = (e) =>{
        e.preventDefault();
        axios.get(`http://localhost:8000/api/recipe/search/${searchText}`)
        .then(res => {
            setRecipeList(res.data);
            console.log(recipeList);
            setSearchText("");
        })
        .catch((err) => {console.log(err)})
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/recipe')
        .then(res => {
            setRecipeList(res.data);
            console.log(recipeList);
        })
        .catch((err) => {console.log(err)});
    }, []
    );

    return (
        <div className='container'>
            <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <div className='hero'>
                <form onSubmit={submitHandler}>
                    <input type='text' className='searchbar' value={searchText} onChange={(e) => {setSearchText(e.target.value)}}/>
                    <input type="submit" className='search-btn' value="Go!"/>
                </form>
            </div>
            <div className='recipes-container'>
                {recipeList && recipeList.map((recipe, index) => (
                    <div key={index} className='recipe-card'>
                        <img className='card-image' src={recipe.image} alt='Recipe' />
                        <div className='card-text-container'>
                            <h2>{recipe.title}</h2>
                            <p>{recipe.description}</p>
                            <p>{recipe.user.username}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home;