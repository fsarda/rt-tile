import React, { FC, useEffect, useState } from 'react';
import { usePrice } from '../api/prices';
import './Tile.css';

export interface ITileProps {
  symbol: string;
}

export const Tile:FC<ITileProps> = ({symbol}) => {
  const buy = usePrice('buy', symbol);
  const sell = usePrice('sell', symbol);
  const [sellActive, setSellActive] = useState<boolean>(false);
  const [buyActive, setBuyActive] = useState<boolean>(false);

  useEffect(() => {
    setSellActive(sell !== '-');
    setTimeout(() => {
      setSellActive(false);
    }, 500);
  }, [sell])

  useEffect(() => {
    setBuyActive(buy !== '-');
    setTimeout(() => {
      setBuyActive(false);
    }, 500);
  }, [buy])

  const sellClass = `price sell ${sellActive ? 'active':''}`;
  const buyClass = `price buy ${buyActive ? 'active':''}`;

  return (
    <div className="tile">
      <h2>{symbol}</h2>
      <div className={buyClass}>
        <button>{buy}</button>
        <span>buy</span>
      </div>
      <div className={sellClass}>
        <button>{sell}</button>
        <span>sell</span>
      </div>
    </div>
  );
}