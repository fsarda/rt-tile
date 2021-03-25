import React, { useState } from 'react';
import './Notional.css';
import { useDefaultNotional } from '../api/execution';

export const Notional = ({symbol, className}: any) => {
  const defaultNotional = useDefaultNotional(symbol);
  const currency = symbol.split('/')[0];
  const [text, setText] = useState<string | undefined>(defaultNotional.toString());
  const [interacted, setInteracted] = useState(false);

  const onNotionalChange = (e: any) => {
    setText(e.target.value);
    setInteracted(true);
  };
  
  const onNotionalReset = () => {
    setText(defaultNotional.toString())
    setInteracted(false);
  }

  return (
    <div className={`notional ${className}`}>
      <span>{currency}</span>
      <input
        type="number"
        value={text}
        onChange={onNotionalChange} /> 
      {interacted && <button onClick={onNotionalReset}> Reset </button>}
    </div>
  );
      
} 