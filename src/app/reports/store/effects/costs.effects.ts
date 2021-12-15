import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { ReportsService } from "src/app/services/shared/reports.service";

import * as CostsActions from "../actions/costs.actions";


@Injectable()
export class CostsEffects {


  getGastosByMonth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CostsActions.loadCostsByMonth),
      concatMap((action) =>
        this.reportService.getSalesCostByMonth(action.query).pipe(
          map((pageable) => CostsActions.loadCostsByMonthSuccess({ data: pageable })),
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
