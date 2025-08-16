'use client';
import { useState, useEffect, useRef } from 'react';

export default function CountdownTimer({ endTime, onEnd, isCard = false }) {
  const [timeLeft, setTimeLeft] = useState({});
  const hasEndedRef = useRef(false);

  const calculateTimeLeft = () => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
  }, [endTime]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Only call onEnd once when auction ends
      if (Object.keys(newTimeLeft).length === 0 && !hasEndedRef.current && onEnd) {
        hasEndedRef.current = true;
        onEnd();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onEnd, endTime]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && interval !== 'seconds' && interval !== 'minutes') {
      return;
    }
    timerComponents.push(
      <span key={interval}>
        {String(timeLeft[interval]).padStart(2, '0')}{interval.charAt(0)}
      </span>
    );
  });
  
  const timeString = `${String(timeLeft.hours || 0).padStart(2, '0')}:${String(timeLeft.minutes || 0).padStart(2, '0')}:${String(timeLeft.seconds || 0).padStart(2, '0')}`;

  if (isCard) {
    const isUrgent = timeLeft.hours === 0 && timeLeft.minutes < 30;
    return (
      <div className={`font-bold ${isUrgent ? 'text-red-600' : 'text-gray-800'}`}>
        {timeLeft.days > 0 ? `${timeLeft.days}d ` : ''}{timeString}
      </div>
    );
  }

  return (
    <div className="text-2xl font-bold text-red-600 tabular-nums">
      {timerComponents.length ? timeString : <span>Time's up!</span>}
    </div>
  );
}
