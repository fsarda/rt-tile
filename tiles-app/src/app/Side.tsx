import { Price, price$, usePrice } from "../api/prices";
import React, { FC } from 'react';
import { concat, timer, of } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { bind } from '@react-rxjs/core';
import { ISymbol } from "../api/symbols";

const [useIsActive] = bind((side: Price['side'], symbol: string) => 
    price$(side, symbol).pipe(
      switchMap( price => concat(of(price !== '-'), timer(500).pipe(mapTo(false)))
    )
), false);

export interface ISide {
  symbol: ISymbol;
  side: Price['side'];
}

export const Side: FC<ISide> = ({symbol, side}) => {
  const price = usePrice(side, symbol);
  const isActive = useIsActive(side, symbol);
  const className = `price ${side} ${isActive ? 'active':''}`;

  return(
    <div className={className}>
      <button>{price}</button>
      <span>{side}</span>
    </div>
  )
}