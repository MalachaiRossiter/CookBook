import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import RecipeForm from './components/RecipeForm';
import Recipe from './components/Recipe';
import UserRecipes from './components/UserRecipes';
import CreateRecipe from './components/CreateRecipe';
import UpdateRecipe from './components/UpdateRecipe';

function App() {

  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    axios.post('http://localhost:8000/api/user/loginCheck', {}, {withCredentials: true})
    .then(res => {
      console.log(res);
      if (res.status === 200){
        setLoggedIn(true);
        console.log(loggedIn);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoggedIn(false);
    });
  }, [loggedIn])

  if (loggedIn === null) { // Display a loading screen if loggedIn is null
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
          <Route path={"/login"} element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
          <Route path={"/signup"} element={<SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
          <Route path={"/createRecipe"} element={<ProtectedRoute loggedIn={loggedIn}><CreateRecipe loggedIn={loggedIn} setLoggedIn={setLoggedIn}/></ProtectedRoute>}/>
          <Route path={"/updateRecipe/:id"} element={<ProtectedRoute loggedIn={loggedIn}><UpdateRecipe loggedIn={loggedIn} setLoggedIn={setLoggedIn}/></ProtectedRoute>}/>
          <Route path={"/recipe/:id"} element={<Recipe loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
          <Route path={"/userRecipes"} element={<ProtectedRoute loggedIn={loggedIn}><UserRecipes loggedIn={loggedIn} setLoggedIn={setLoggedIn}/></ProtectedRoute>}/>
          <Route path={"/favorites"} element={<ProtectedRoute loggedIn={loggedIn}><RecipeForm/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
