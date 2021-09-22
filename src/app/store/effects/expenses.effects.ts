import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { ReportsService } from "src/app/services/shared/reports.service";
import * as ExpensesActions from "../actions/expenses.actions";



@Injectable()
export class ExpensesEffects {


  getExpensesByMonth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExpensesActions.loadExpensesByMonth),
      concatMap((action) =>
        this.reportService.getSalesCostByMonth(action.query).pipe(
          map((pageable) => ExpensesActions.loadExpensesByMonthSuccess({ data: pageable })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });


  constructor(private actions$: Actions,
    private reportService: ReportsService,
    ) {}

}
