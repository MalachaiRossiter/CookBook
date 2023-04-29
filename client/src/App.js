import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';

import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp/>} default />
          <Route path={"/login"} element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
