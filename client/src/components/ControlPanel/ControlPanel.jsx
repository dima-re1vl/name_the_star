// client/src/components/ControlPanel.js
import React from 'react';
import { auth, db } from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { addDoc, collection, updateDoc, getDocs, doc } from 'firebase/firestore';
import './ControlPanel.css';

const ControlPanel = () => {
  const handleLogout = () => {
    signOut(auth).then(() => {
      alert('Вы вышли из системы.');
    }).catch((error) => {
      alert('Ошибка при выходе из системы: ' + error.message);
    });
  };

  const handleAddStar = async () => {
    try {
      const newStar = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        name: ''
      };
      await addDoc(collection(db, 'stars'), newStar);
      alert('Новая звезда добавлена.');
    } catch (error) {
      console.error("Ошибка при добавлении звезды: ", error);
    }
  };

  const handleClearStars = async () => {
    try {
      const starsCollection = collection(db, 'stars');
      const starsSnapshot = await getDocs(starsCollection);
      const batch = db.batch();
      starsSnapshot.forEach(doc => {
        const starRef = doc.ref;
        batch.update(starRef, { name: '' });
      });
      await batch.commit();
      alert('Все звезды очищены.');
    } catch (error) {
      console.error("Ошибка при очистке звёзд: ", error);
    }
  };

  return (
    <div className="control-panel">
      <h2>Панель управления</h2>
      <button onClick={handleAddStar}>Добавить звезду</button>
      <button onClick={handleClearStars}>Очистить звёзды</button>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default ControlPanel;
