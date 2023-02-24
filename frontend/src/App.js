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

// components
import AppBar from './components/AppBar/AppBar.js';
import Login from './components/Login/Login.js';

import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";


function App() {
  // const [token, setToken] = useState();
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <ThemeProvider theme={theme}>
      <div >
        <BrowserRouter>
          <div>
            <AppBar>

            </AppBar>
          </div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/user" element={<User />} />
            <Route exact path="/otherpage" element={<OtherPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
