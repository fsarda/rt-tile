import React from 'react';
import { useMidPrice } from '../api/prices';
import './MidPrice.css';

export const MidPrice = ({symbol, className}: any) => {
  const midPrice = useMidPrice(symbol);
  const isMidPriceDefined = midPrice.price !== undefined && midPrice.price !== 0;
  const midPriceTrendClass = midPrice.isRising ? 'up' : 'down';

  return (
  <div className={`midPrice ${className}`}>
    {isMidPriceDefined ? (
      <>
        {`Mid price: ${midPrice.price}`}
        <span className={midPriceTrendClass}></span>
      </>
    ) : null}    
  </div>)
      
} 