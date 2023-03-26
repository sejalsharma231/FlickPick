import { Box } from '@mui/system';
import React, { useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

// pages
import Home from './pages/home/Home.js';
import OtherPage from './pages/otherPage/OtherPage'
import User from './pages/UserPage/Userpage.js';
import Recommend from './pages/Recommend/Recommend.js';

// components
import AppBar from './components/AppBar/AppBar.js';
import Login from './pages/Login/Login.js';

import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";


function App() {

  return (
    <ThemeProvider theme={theme}>
      <div >
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<div><AppBar /><Home /></div>} />
            <Route exact path="/user" element={<div><AppBar /><User /></div>} />
            <Route exact path="/otherpage" element={<div><AppBar /><OtherPage /></div>} />
            <Route exact path="/recommend" element={<div><AppBar /><Recommend /></div>} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
