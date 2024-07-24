import React, { useState, useEffect } from 'react';
import './StarMap.css';

const StarMap = () => {
  const [stars, setStars] = useState([]);
  const [cursorCoords, setCursorCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
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
  }, []);

  const handleMouseMove = (event) => {
    setCursorCoords({ x: event.clientX, y: event.clientY });
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
        ></div>
      ))}
      <div className="cursor-coords">
        {`x: ${cursorCoords.x}, y: ${cursorCoords.y}`}
      </div>
    </div>
  );
};

export default StarMap;
