import React, { FC, useEffect } from 'react';
import { filter, map, startWith } from 'rxjs/operators';
import { price$, Price } from './prices';
import { Observable, Subject } from "rxjs"
import { bind } from "@react-rxjs/core";

const [usePrice] = bind(price$, {price: 0, side: 'sell'});

export const Tile:FC = () => {
  
  const price = usePrice();

  return (
    <div>
      <span>{price.price}</span>
    </div>
  );
}