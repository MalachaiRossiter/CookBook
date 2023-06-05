import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/navbar.css'; // Update import path for CSS file

const NavBar = (props) => {
    const { loggedIn, setLoggedIn } = props;
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [change, setChange] = useState(false);

    const navigate = useNavigate();

    const logOutHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/user/logout', {}, { withCredentials: true })
        .then((res) => {
        console.log(res);
        setLoggedIn(false);
        navigate('/login');
    })
    .catch((err) => {
        console.log(err);
    });
};

    const toggleNavHandler = () => {
        setIsNavVisible(!isNavVisible);
        setChange(!change);
    };

    return (
        <div className="navbar">
            <div className="logo">
                <Link to={"/"} className='link-item' id={'logo'}>The Internet Cookbook</Link>
            </div>
            <ul className={`links ${isNavVisible ? 'visible' : ''}`}>
            {loggedIn ? (
            <>
                <li className={'nav-link'}>
                    <Link to={"/createRecipe"} className='link-item'>Create Recipe</Link>
                </li>
                <li className={'nav-link'}>
                    <Link to={"/userRecipes"} className='link-item'>My Recipes</Link>
                </li>
                <li className={'nav-link'}>
                    <Link to={"/favorites"} className='link-item'>Favorites</Link>
                </li>
            </>
            ) : (
                null
            )}
            {loggedIn ? (
                <li className={'nav-link'}>
                    <Link onClick={logOutHandler} className='link-item'>Log out</Link>
                </li>
            ) : (
                <li className={'nav-link'}>
                    <Link to={"/login"} className='link-item'>Login</Link>
                </li>
            )}
            </ul>
            <div className="toggle-btn" onClick={toggleNavHandler}>
                <div className={`bar1 ${change ? 'change' : ''}`}></div>
                <div className={`bar2 ${change ? 'change' : ''}`}></div>
                <div className={`bar3 ${change ? 'change' : ''}`}></div>
            </div>
        </div>
    );
};

export default NavBar;