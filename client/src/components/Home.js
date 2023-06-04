import NavBar from './NavBar';
import RecipeList from './RecipeList';
import home from '../styles/home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
                    <input type='text' className='searchbar' value={searchText} placeholder='Epic Chicken Wings...' onChange={(e) => {setSearchText(e.target.value)}}/>
                    <input type="submit" className='search-btn' value="Go!"/>
                </form>
            </div>
            <RecipeList recipeList={recipeList}/>
        </div>
    )
}
export default Home;