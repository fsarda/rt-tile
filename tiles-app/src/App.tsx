import React from 'react';
import './App.css';
import { Tile } from './app/Tile';
import { symbols } from './api/symbols';

export const App = () => (
  <div className="tile-container">
    {symbols.map( symbol => <Tile symbol={symbol}/>)}
  </div>
);
