import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { ReportsService } from "src/app/services/shared/reports.service";

import * as SalesActions from "../actions/sales.actions";


@Injectable()
export class SalesEffects {


  getGastosByMonth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SalesActions.loadSalesByMonth),
      concatMap((action) =>
        this.reportService.getSalesByMonth(action.query).pipe(
          map((pageable) => SalesActions.loadSalesByMonthSuccess({ data: pageable })),
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
