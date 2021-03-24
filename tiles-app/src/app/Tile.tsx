import React, { FC } from 'react';
import { usePrice } from '../api/prices';
import './Tile.css';

export interface ITileProps {
  symbol: string;
}

export const Tile:FC<ITileProps> = ({symbol}) => {
  const buy = usePrice('buy', symbol);
  const sell = usePrice('sell', symbol);

  return (
    <div className="tile">
      <h2>{symbol}</h2>
      <button className="price buy">{buy}</button> 
      <button className="price sell">{sell}</button> 
    </div>
  );
}