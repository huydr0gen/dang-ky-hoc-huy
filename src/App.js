import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './Components/Login/Login';
import Home from './Components/Home';
import List from './Components/List';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/list' element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
