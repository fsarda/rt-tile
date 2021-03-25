import { ISymbol, symbols } from "./symbols";
import { from } from "rxjs";
import { filter, map } from "rxjs/operators";
import { bind } from "@react-rxjs/core";

export interface IDefaultNotional {
  symbol: ISymbol;
  defaultNotional: number;
}

export const defaultNotional: Array<IDefaultNotional> = symbols.map(
  (symbol) => ({
    symbol,
    defaultNotional: Math.random() > 0.5 ? 1000000 : 2000000,
  })
);

export const [useDefaultNotional, defaultNotional$] = bind(
  (symbol: ISymbol) =>
    from(defaultNotional).pipe(
      filter((item: IDefaultNotional) => item.symbol === symbol),
      map(({ defaultNotional }: IDefaultNotional) => defaultNotional)
    ),
  0
);
