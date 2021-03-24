import { map, filter, tap } from "rxjs/operators";
import { interval, Observable } from "rxjs";
import { bind } from "@react-rxjs/core";
import { symbols } from "./symbols";

export interface Price {
  price: number;
  symbol: string;
  side: "buy" | "sell";
}

const [, price$] = bind(
  interval(1000).pipe(
    map(() => {
      const price: number = Math.round(Math.random() * 1000) / 1000;
      const side: Price["side"] = Math.random() > 0.5 ? "buy" : "sell";
      const symbol: string =
        symbols[Math.floor(Math.random() * (symbols.length - 1))];
      return {
        price,
        side,
        symbol,
      } as Price;
    })
  )
);

export const [usePrice] = bind(
  (side: Price["side"], symbol: string): Observable<number | "-"> =>
    price$.pipe(
      filter((beat: Price) => beat.side === side && beat.symbol === symbol),
      tap(console.log),
      map((beat: Price): number => beat.price)
    ),
  "-"
);
