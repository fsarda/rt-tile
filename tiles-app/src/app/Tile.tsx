import React, { FC } from 'react';
import './Tile.css';
import { MidPrice } from './MidPrice';
import { ISymbol } from '../api/symbols';
import { Side } from './Side';
import { Notional } from './Notional';
import { useExecutions } from '../api/execution';

export interface ITileProps {
  symbol:  ISymbol;
};

export const Tile:FC<ITileProps> = ({symbol}) => {
  const { state, message } = useExecutions(symbol);
  
  return (
    <div className="tile">
      <div className={`state ${state ?? 'hidden' }`}>{message}</div>
      <h3>{symbol}</h3>
      <MidPrice symbol={symbol} className="trend"/>
      <Side side={'buy'} symbol={symbol} />
      <Side side={'sell'} symbol={symbol} />
      <Notional symbol={symbol} className="notional" />
    </div>
  );
}