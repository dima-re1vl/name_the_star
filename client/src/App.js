// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StarMap from './components/StarMap/StarMap';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <>
              <StarMap />
              <ControlPanel />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
