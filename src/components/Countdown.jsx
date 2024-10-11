// src/components/Countdown.jsx

import React, { useState, useEffect } from 'react';
import "./Countdown.css";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Target date for the tournament (change this to your desired date)
  const targetDate = new Date("2024-11-01T00:00:00");

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-container">
      <h2>Tournament starts in:</h2>
      <div className="countdown-timer">
        <div className="time-unit">
          <span>{timeLeft.days}</span>
          <span className="label">Days</span>
        </div>
        <div className="time-unit">
          <span>{timeLeft.hours}</span>
          <span className="label">Hours</span>
        </div>
        <div className="time-unit">
          <span>{timeLeft.minutes}</span>
          <span className="label">Minutes</span>
        </div>
        <div className="time-unit">
          <span>{timeLeft.seconds}</span>
          <span className="label">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
