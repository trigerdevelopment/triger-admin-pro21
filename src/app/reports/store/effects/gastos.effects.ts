import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { ReportsService } from "src/app/services/shared/reports.service";

import * as GastosActions from "../actions/gastos.actions";


@Injectable()
export class GastosEffects {


  getGastosByMonth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GastosActions.loadGastosByMonth),
      concatMap((action) =>
        this.reportService.getExpenseByMonth(action.query).pipe(
          map((pageable) => GastosActions.loadGastosByMonthSuccess({ data: pageable })),
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
