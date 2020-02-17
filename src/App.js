import React, { useState, useEffect } from 'react';
import './App.css';

const initialLocationState = {
  lat: null,
  lon: null,
  speed: null
};

function App() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  const [location, setLocation] = useState(initialLocationState);
  let mounted = true;

  const onIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const toggleLight = () => {
    setIsOn(prevState => !prevState);
  };

  useEffect(() => {
    document.title = `you have clicked ${count} times `;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    navigator.geolocation.getCurrentPosition(handleGeoLocation);
    const watchId = navigator.geolocation.watchPosition(handleGeoLocation);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      navigator.geolocation.clearWatch(watchId);
      mounted = false;
    };
  }, [count]);

  const handleGeoLocation = e => {
    if (mounted) {
      setLocation({
        lat: e.coords.latitude,
        lon: e.coords.longitude,
        speed: e.coords.speed
      });
    }
  };

  const handleMouseMove = e => {
    setMousePosition({
      x: e.pageX,
      y: e.pageY
    });
  };

  const handleOnline = () => {
    setStatus(true);
  };

  const handleOffline = () => {
    setStatus(false);
  };

  return (
    <div className="App">
      <h2>Counter</h2>
      <button onClick={onIncrement}>I was clicked {count} times</button>
      <h2>Toggle Light</h2>
      <div
        onClick={toggleLight}
        style={{
          height: '50px',
          width: '50px',
          backgroundColor: isOn ? 'yellow' : 'grey'
        }}
      ></div>

      <h2>Mouse Position</h2>

      {JSON.stringify(mousePosition)}

      <h2>Network Status</h2>
      <p>You are {status ? 'online' : 'offline'}</p>

      <h2>Geolocation</h2>
      <p>
        Latitude is {location.lat} Longitude is {location.lon} Speed is{' '}
        {location.speed ? location.speed : '0'}
      </p>
    </div>
  );
}

export default App;
