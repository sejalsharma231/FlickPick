import { Box } from '@mui/system';
import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './pages/home/Home.js';
import OtherPage from './pages/otherPage/OtherPage'
import User from './pages/UserPage/Userpage.js';


function App() {

  return (
    <div >
      <Box p={4}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/user" element={<User />} />
            <Route exact path="/otherpage" element={<OtherPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </div>
  );
}

export default App;
