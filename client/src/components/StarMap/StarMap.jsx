// client/src/components/StarMap.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './StarMap.css';

const StarMap = () => {
  const [stars, setStars] = useState([]);
  const [cursorCoords, setCursorCoords] = useState({ x: 0, y: 0 });
  const [user, setUser] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);

  useEffect(() => {
    // Загрузка звёзд из Firestore
    const fetchStars = async () => {
      const starsCollection = collection(db, 'stars');
      const starsSnapshot = await getDocs(starsCollection);
      const starsList = starsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStars(starsList);
    };

    fetchStars();

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

  const handleStarClick = (star) => {
    setSelectedStar(star);
    if (user) {
      if (!star.name) {
        updateStarName(star.id);
      } else {
        alert(`Эта звезда уже зарегистрирована пользователем ${star.name}`);
      }
    } else {
      alert('Пожалуйста, войдите в систему, чтобы зарегистрировать звезду.');
    }
  };

  const updateStarName = async (starId) => {
    try {
      const starRef = doc(db, 'stars', starId);
      await updateDoc(starRef, { name: user.email });
      alert(`Звезда ${starId} зарегистрирована пользователем ${user.email}`);
      // Обновление состояния звёзд
      setStars((prevStars) =>
        prevStars.map((star) =>
          star.id === starId ? { ...star, name: user.email } : star
        )
      );
    } catch (error) {
      console.error("Ошибка при обновлении звезды: ", error);
    }
  };

  return (
    <div className="star-map-container">
      <TransformWrapper>
        <TransformComponent>
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
                  backgroundColor: star.name ? 'yellow' : 'white'
                }}
                onClick={() => handleStarClick(star)}
              ></div>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
      <div className="cursor-coords">
        {`x: ${cursorCoords.x}, y: ${cursorCoords.y}`}
      </div>
      {user && <div className="user-info">Вошел как: {user.email}</div>}
      {selectedStar && selectedStar.name && (
        <div className="star-info">
          {`Звезда ${selectedStar.id} зарегистрирована пользователем ${selectedStar.name}`}
        </div>
      )}
    </div>
  );
};

export default StarMap;
