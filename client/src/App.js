import React from 'react';
import StarMap from './components/StarMap/StarMap';
import ControlPanel from './components/ControlPanel/ControlPanel';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <StarMap />
      <ControlPanel />
    </div>
  );
};

export default App;
