import React, { useState } from 'react';
import './App.css';

const directions = ['N', 'E', 'S', 'W'];

const moveForward = (position, direction) => {
  switch (direction) {
    case 'N': return { x: position.x, y: position.y - 1 };
    case 'E': return { x: position.x + 1, y: position.y };
    case 'S': return { x: position.x, y: position.y + 1 };
    case 'W': return { x: position.x - 1, y: position.y };
    default: return position;
  }
};

const App = () => {
  const [position, setPosition] = useState({ x: 2, y: 2 });
  const [direction, setDirection] = useState('N');
  const [message, setMessage] = useState('');

  const handleMove = () => {
    const newPosition = moveForward(position, direction);
    if (newPosition.x >= 0 && newPosition.x < 5 && newPosition.y >= 0 && newPosition.y < 5) {
      setPosition(newPosition);
      setMessage('');
    } else {
      setMessage('Cannot move forward. You are at the edge of the 5x5 grid.');
    }
  };

  const handleRotate = (newDirection) => {
    setDirection(newDirection);
    setMessage('');
  };

  return (
    <div className="app">
      <div className="grid">
        {[...Array(5)].map((_, y) => (
          <div key={y} className="row">
            {[...Array(5)].map((_, x) => (
              <div key={x} className={`cell ${position.x === x && position.y === y ? 'robot' : ''}`}>
                {position.x === x && position.y === y && direction}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={handleMove}>Move Forward</button>
        {directions.map(dir => (
          <button key={dir} onClick={() => handleRotate(dir)}>{dir}</button>
        ))}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default App;
