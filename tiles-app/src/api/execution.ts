import { ISymbol, symbols } from "./symbols";
import { interval, Observable } from "rxjs";
import { filter, map, concatMap, startWith } from "rxjs/operators";
import { bind } from "@react-rxjs/core";

export interface IDefaultNotional {
  symbol: ISymbol;
  defaultNotional: number;
}

const createData = () =>
  symbols.map((symbol) => ({
    symbol,
    defaultNotional: (Math.floor(Math.random() * 10) + 1) * 100000,
  }));

export const defaultNotionals$: Observable<Array<IDefaultNotional>> = interval(
  10000
).pipe(
  startWith(createData()),
  map(() => createData())
);

export const [useDefaultNotional, defaultNotional$] = bind(
  (symbol: ISymbol) =>
    defaultNotionals$.pipe(
      concatMap((x) => x),
      filter((item: IDefaultNotional) => item.symbol === symbol),
      map(({ defaultNotional }: IDefaultNotional) => defaultNotional)
    ),
  0
);
