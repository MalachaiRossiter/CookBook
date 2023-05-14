import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

import navbar from '../styles/navbar.css'

const NavBar = (props) => {
    const {loggedIn, setLoggedIn} = props;

    const navigate = useNavigate();

    const logOutHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/logout', {}, {withCredentials: true})
        .then (res => {
            console.log(res);
            setLoggedIn(false);
            navigate('/login');
        })
        .catch((err) => {console.log(err)});
    }

    return (
        <div className='navbar'>
            <Link to={"/"} className='logo'>Internet Cookbook</Link>
                {loggedIn ? (
                    <div>
                        <Link to={'/createRecipe'} className='link-item'>create recipe</Link>
                        <Link to={'/userRecipes'} className='link-item'>My Recipes</Link>
                        <Link to={'/favorites'} className='link-item'>Favorites</Link>
                        <Link onClick={logOutHandler} className='link-item'>Log out</Link>
                    </div>
                ) : (
                    <Link to={'/login'}>Login</Link>
                )}
        </div>
    )
} 
export default NavBar;