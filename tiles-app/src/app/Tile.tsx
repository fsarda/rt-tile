import React, { FC } from 'react';
import './Tile.css';
import { MidPrice } from './MidPrice';
import { ISymbol } from '../api/symbols';
import { Side } from './Side';
import { Notional } from './Notional';

export interface ITileProps {
  symbol:  ISymbol;
};

export const Tile:FC<ITileProps> = ({symbol}) => {
  return (
    <div className="tile">
      <h3>{symbol}</h3>
      <MidPrice symbol={symbol} className="trend"/>
      <Side side={'buy'} symbol={symbol} />
      <Side side={'sell'} symbol={symbol} />
      <Notional symbol={symbol} className="notional" />
    </div>
  );
}