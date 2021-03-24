import { map } from "rxjs/operators";
import { interval, Observable } from "rxjs";

export interface Price {
  price: number;
  side: "buy" | "sell";
}

export const price$: Observable<Price> = interval(1000).pipe(
  map(() => {
    const price = Math.random();
    const side = Math.random() > 0.5 ? "buy" : "sell";
    return {
      price,
      side,
    };
  })
);
