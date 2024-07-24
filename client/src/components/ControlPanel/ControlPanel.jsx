// client/src/components/ControlPanel.js
import React from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import './ControlPanel.css';

const ControlPanel = () => {
  const handleLogout = () => {
    signOut(auth).then(() => {
      alert('Вы вышли из системы.');
    }).catch((error) => {
      alert('Ошибка при выходе из системы: ' + error.message);
    });
  };

  return (
    <div className="control-panel">
      <h2>Панель управления</h2>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default ControlPanel;
