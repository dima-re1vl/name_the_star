// client/src/components/StarMap.js
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import './StarMap.css';

const StarMap = () => {
  const [stars, setStars] = useState([]);
  const [cursorCoords, setCursorCoords] = useState({ x: 0, y: 0 });
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Генерация звезд
    const generateStars = () => {
      const starsArray = [];
      for (let i = 0; i < 100; i++) {
        starsArray.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
        });
      }
      setStars(starsArray);
    };

    generateStars();

    // Проверка авторизации пользователя
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleMouseMove = (event) => {
    setCursorCoords({ x: event.clientX, y: event.clientY });
  };

  const handleStarClick = (starId) => {
    if (user) {
      // Функционал для регистрации звезды
      alert(`Звезда ${starId} зарегистрирована пользователем ${user.email}`);
    } else {
      alert('Пожалуйста, войдите в систему, чтобы зарегистрировать звезду.');
    }
  };

  return (
    <div className="star-map" onMouseMove={handleMouseMove}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          onClick={() => handleStarClick(star.id)}
        ></div>
      ))}
      <div className="cursor-coords">
        {`x: ${cursorCoords.x}, y: ${cursorCoords.y}`}
      </div>
      {user && <div className="user-info">Вошел как: {user.email}</div>}
    </div>
  );
};

export default StarMap;
