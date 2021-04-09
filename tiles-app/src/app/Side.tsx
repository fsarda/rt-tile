import { Price, price$, usePrice } from "../api/prices";
import React, { FC } from 'react';
import { concat, timer, of } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { bind } from '@react-rxjs/core';
import { ISymbol } from "../api/symbols";
import './Side.css';
import { executionsSubject$, useNotional } from "../api/execution";

const [useIsActive] = bind((side: Price['side'], symbol: string) => 
    price$(side, symbol).pipe(
      switchMap( price => concat(of(price !== undefined), timer(500).pipe(mapTo(false)))
    )
), false);

export interface ISide {
  symbol: ISymbol;
  side: Price['side'];
}

export const Side: FC<ISide> = ({symbol, side}) => {
  const price = usePrice(side, symbol);
  const notional = useNotional(symbol);
  const isActive = useIsActive(side, symbol);
  const isDisabled = !price || !notional;
  
  const className = `price ${side} ${
    isActive ? 'active':''
  } ${
    isDisabled ? 'disabled': ''
  }`;

  const onExecutionClick = () => {
    executionsSubject$.next({symbol, side, price: price || 0, notional});
  }

  return(
    <div className={`side-button ${className}`}  onClick={onExecutionClick}>
      <button disabled={isDisabled}>{price || "-"}</button>
      <span>{side}</span>
    </div>
  )
}