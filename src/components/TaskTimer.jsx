import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function TaskTimer({ initialTime = 0, isRunning = false, onTimeUpdate }) {
  const [seconds, setSeconds] = useState(initialTime);
  const [isActive, setIsActive] = useState(isRunning);

  // Синхронизация с внешними изменениями
  useEffect(() => {
    setSeconds(initialTime);
  }, [initialTime]);

  useEffect(() => {
    setIsActive(isRunning);
  }, [isRunning]);

  // Логика таймера
  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev + 1;
          onTimeUpdate(newSeconds, true);
          return newSeconds;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, onTimeUpdate]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60) % 60;
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <button 
        className={`icon ${isActive ? 'icon-pause' : 'icon-play'}`}
        onClick={() => {
          const newState = !isActive;
          setIsActive(newState);
          onTimeUpdate(seconds, newState);
        }}
      />
      {formatTime()}
    </>
  );
}

TaskTimer.propTypes = {
  initialTime: PropTypes.number,
  isRunning: PropTypes.bool,
  onTimeUpdate: PropTypes.func.isRequired,
};

TaskTimer.defaultProps = {
  initialTime: 0,
  isRunning: false,
};