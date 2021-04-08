import { map, filter, scan } from "rxjs/operators";
import { interval, Observable, combineLatest } from "rxjs";
import { bind, shareLatest } from "@react-rxjs/core";
import { symbols } from "./symbols";

export interface Price {
  price: number;
  symbol: string;
  side: "buy" | "sell" | "mid";
  isRising?: boolean;
}

const formatPrice = (price: number) => parseFloat(price.toFixed(4));

const allPrices$ = interval(1000).pipe(
  map(() => {
    const price: number = formatPrice(Math.random());
    const side: Price["side"] = Math.random() > 0.5 ? "buy" : "sell";
    const symbol: string = symbols[Math.floor(Math.random() * symbols.length)];
    return {
      price,
      side,
      symbol,
    } as Price;
  }),
  shareLatest()
);

export const [usePrice, price$] = bind(
  (side: Price["side"], symbol: string): Observable<number | "-"> =>
    allPrices$.pipe(
      filter((beat: Price) => beat.side === side && beat.symbol === symbol),
      map((beat: Price): number => beat.price)
    ),
  "-"
);

export const [useMidPrice, midPrice$] = bind(
  (symbol: string): Observable<Price> =>
    combineLatest([price$("buy", symbol), price$("sell", symbol)]).pipe(
      map(
        ([buy, sell]) =>
          ({
            side: "mid",
            price:
              buy !== "-" && sell !== "-" ? formatPrice((buy + sell) / 2) : 0,
            symbol,
          } as Price)
      ),
      scan(
        (acc: Price, beat: Price) => ({
          ...beat,
          isRising: acc.price < beat.price,
        }),
        {} as Price
      )
    ),
  {} as Price
);
