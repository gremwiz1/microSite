import React, { useState } from 'react';

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
