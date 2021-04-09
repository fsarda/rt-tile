import React, { useEffect, useState } from 'react';
import './Notional.css';
import {
  useNotional,
  notionalSubject$,
  INotional
} from '../api/execution';

const setNotional = (notional: INotional) => notionalSubject$.next(notional);

export const Notional = ({symbol, className}: any) => {
  const notional = useNotional(symbol);
  const currency = symbol.split('/')[0];
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    setNotional({symbol, notional: undefined, interacted: false});
  }, [symbol])

  const onNotionalChange = (e: any) => {
    setInteracted(true);
    setNotional({symbol, notional: Number.parseFloat(e.target.value), interacted: true});
  };
  
  const onNotionalReset = () => {
    setInteracted(false);
    setNotional({symbol, notional: undefined, interacted: false});
  }

  return (
    <div className={`notional ${className}`}>
      <span>{currency}</span>
      <input
        type="number"
        value={ notional }
        onChange={onNotionalChange} /> 
      {interacted && <button onClick={onNotionalReset}> Reset </button>}
    </div>
  );  
} 