import { Box } from '@mui/system';
import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

// pages
import Home from './pages/home/Home.js';
import User from './pages/UserPage/Userpage.js';
import Recommend from './pages/Recommend/Recommend.js';
import Trending from './pages/Trending/Trending.js';
import Login from './pages/Login/Login.js';

// components
import AppBar from './components/AppBar/AppBar.js';

import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";

import { SocketProvider } from './context/SocketContext';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div >
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<div><AppBar /><SocketProvider>< Home /></SocketProvider></div>} />
            <Route exact path="/user" element={<div><AppBar /><User /></div>} />
            <Route exact path="/recommend" element={<div><AppBar /><Recommend /></div>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/trending" element={<SocketProvider><AppBar /><Trending /></SocketProvider>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
