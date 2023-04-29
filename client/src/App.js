import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  //   axios.post('http://localhost:8000/api/user/loginCheck', {}, {withCredentials: true})
  //   .then(res => {
  //     console.log(res);
  //     if (res.status === 200){
  //       setLoggedIn(true);
  //       console.log(loggedIn);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     setLoggedIn(false);
  //   });
  // }, [loggedIn])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} default />
          <Route path={"/login"} element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
          <Route path={"/signup"} element={<SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
