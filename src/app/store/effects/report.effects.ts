import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { ReportsService } from "src/app/services/shared/reports.service";

import * as ReportActions from "../actions/report.actions";


@Injectable()
export class ReportEffects {


  getSalesByMonth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReportActions.loadSalesByMonth),
      concatMap((action) =>
        this.reportService.getSalesByMonthByCustomer(action.query).pipe(
          map((pageable) => ReportActions.loadSalesByMonthSuccess({ data: pageable })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });

  /*---- LA ACCION SE DISPARA DESDE "report.actions.ts" para obtener los gastos por mes  ----*/
  getExpensesByMonth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReportActions.loadExpensesByMonth),
      concatMap((action) =>
        this.reportService.getExpenseByMonth(action.query).pipe(
          map((pageable) => ReportActions.loadExpensesByMonthSuccess({ data: pageable })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });
  getPurchaseByMonth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReportActions.loadPurchaseByMonth),
      concatMap((action) =>
        this.reportService.getPurchaseByMonthByCustomer(action.query).pipe(
          map((pageable) => ReportActions.loadPurchaseByMonthSuccess({ data: pageable })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions,
    private reportService: ReportsService,
    private route: Router
    ) {}

}
