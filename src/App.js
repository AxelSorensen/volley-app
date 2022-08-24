import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import { AuthContextProvider} from './Auth/Auth';
import ProtectedRoute from './Auth/ProtectedRoute';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import BottomNav from './Components/BottomNav';
import Profile from './Pages/Profile';
import Map from './Pages/Map';


function App() {

  return (
    <AuthContextProvider>
      <div className='grid'>
        <BottomNav/>
          <Routes>
            <Route path='/praktisk' element={<Profile/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/map' element={<Map/>} />
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              }
            />
          </Routes>
      </div>
  </AuthContextProvider>
  );
}

export default App;

