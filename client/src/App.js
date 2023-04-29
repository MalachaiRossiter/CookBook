import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp/>} default />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
