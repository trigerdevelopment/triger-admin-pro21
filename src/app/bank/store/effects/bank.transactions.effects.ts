import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { BankService } from "src/app/services/bank.service";

import * as BankMovActions from "../actions/bank.transactions.actions";


@Injectable()
export class BankMovEffects {

  getBankMovements$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BankMovActions.loadBankTransactions),
      concatMap((action) =>
        this.invoiceService.getBankMovByQuery('').pipe(
          map((pageable) => BankMovActions.loadBankTransactionsSuccess({ data: pageable })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });

  getBankMovementsByFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BankMovActions.loadBankTransactionsByQuery),
      concatMap((action) =>
        this.invoiceService.getBankMovByQuery(action.query).pipe(
          map((pageable) => BankMovActions.loadBankTransactionsSuccess({ data: pageable })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions,
    private invoiceService: BankService,
    ) {}

  }
