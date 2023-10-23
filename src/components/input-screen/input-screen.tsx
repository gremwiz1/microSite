import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputScreen: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [agreed, setAgreed] = useState<boolean>(false);

  const handleKeyClick = (value: number | string) => {
    if (value === 'BACKSPACE' && number) {
      setNumber(prev => prev.slice(0, -1));
    } else if (typeof value === 'number' && number.length < 10) {
      setNumber(prev => prev + value);
    }
  }

  const navigate = useNavigate();
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);


const resetInactivityTimer = () => {
  if (inactivityTimerRef.current) {
    clearTimeout(inactivityTimerRef.current);
  }

  inactivityTimerRef.current = setTimeout(() => {
    navigate("/");
  }, 10000); 
};

useEffect(() => {
  resetInactivityTimer();

  window.addEventListener("mousemove", resetInactivityTimer);
  window.addEventListener("keypress", resetInactivityTimer);
  window.addEventListener("click", resetInactivityTimer);

  return () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    window.removeEventListener("mousemove", resetInactivityTimer);
    window.removeEventListener("keypress", resetInactivityTimer);
    window.removeEventListener("click", resetInactivityTimer);
  };
}, []);

  return (
    <div>
      <input 
        type="text" 
        value={number} 
        readOnly 
      />
      <div>
        {[1,2,3,4,5,6,7,8,9,0].map(num => (
          <button key={num} onClick={() => handleKeyClick(num)}>{num}</button>
        ))}
        <button onClick={() => handleKeyClick('BACKSPACE')}>Стереть</button>
      </div>
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={agreed}
            onChange={() => setAgreed(prev => !prev)}
          />
          Согласие на обработку ПД
        </label>
      </div>
      <button disabled={!agreed || number.length < 10}>
        Подтвердить номер
      </button>
    </div>
  );
}

export default InputScreen;
