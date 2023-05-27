import NavBar from './NavBar';
import home from '../styles/home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = (props) => {

    const {loggedIn, setLoggedIn} = props;

    const [recipeList, setRecipeList] = useState();

    const submitHandler = (e) =>{
        e.preventDefault();
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
                <form onSubmit="submitHandler">
                    <input type='text' className='searchbar'/>
                    <input type="submit" className='search-btn' value="Go!"/>
                </form>
            </div>
            <div className='recipes-container'>
                {
                    recipeList && recipeList.map((recipe, index) => (
                        <div key={index} className=''>
                            <h2>{recipe.user.username}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Home;