import { ISymbol, symbols } from "./symbols";
import { concat, interval, Observable, of, Subject, timer } from "rxjs";
import {
  filter,
  map,
  concatMap,
  startWith,
  tap,
  withLatestFrom,
  switchMap,
  mapTo,
} from "rxjs/operators";
import { bind } from "@react-rxjs/core";
import { Price } from "./prices";

export interface IDefaultNotional {
  symbol: ISymbol;
  defaultNotional: number;
}

export interface INotional {
  symbol: ISymbol;
  notional: number | undefined;
  interacted?: boolean;
}

export interface IExecution extends INotional, Price {}

const createData = () =>
  symbols.map((symbol) => ({
    symbol,
    defaultNotional: (Math.floor(Math.random() * 10) + 1) * 100000,
  }));

export const defaultNotionals$: Observable<Array<IDefaultNotional>> = interval(
  10000
).pipe(startWith(createData()), map(createData));

export const [useDefaultNotional, defaultNotional$] = bind(
  (symbol: ISymbol) =>
    defaultNotionals$.pipe(
      concatMap((x) => x),
      filter((item: IDefaultNotional) => item.symbol === symbol),
      map(({ defaultNotional }: IDefaultNotional) => defaultNotional)
    ),
  0
);

export const notionalSubject$ = new Subject<INotional>();

export const [useNotional, notional$] = bind(
  (symbol: ISymbol) =>
    notionalSubject$.pipe(
      withLatestFrom(defaultNotional$(symbol)),
      filter(([item]) => item.symbol === symbol),
      map(([{ notional, interacted }, defaultNotional]) => {
        return notional || interacted ? notional : defaultNotional;
      })
    ),
  undefined
);

export const executionsSubject$ = new Subject<IExecution>();

export const [useExecutions, executions$] = bind(
  (symbol: ISymbol) =>
    executionsSubject$.pipe(
      filter((item) => item.symbol === symbol),
      switchMap((item) =>
        concat(
          of({
            state: "executing",
            message: `Performing ${item.side} for ${item.notional}@${item.price} on ${symbol}`,
          }),
          timer(2500).pipe(
            map(() =>
              Math.random() < 0.8
                ? {
                    state: "success",
                    message: `The ${item.side} for ${item.notional}@${item.price} on ${symbol} was executed successfully`,
                  }
                : {
                    state: "error",
                    message: `An error has occurred with the ${item.side} for ${item.notional}@${item.price} on ${symbol}`,
                  }
            )
          ),
          timer(3500).pipe(mapTo({ state: undefined, message: undefined }))
        )
      )
    ),
  { state: undefined, message: undefined }
);
