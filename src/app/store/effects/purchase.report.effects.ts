import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { ReportsService } from "src/app/services/shared/reports.service";

import * as ReportPurchaseActions from '../actions/purchase.report.actions';



@Injectable()
export class ReportPurchaseEffects {



  getPurchaseByMonth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReportPurchaseActions.loadPurchaseByMonth),
      concatMap((action) =>
        this.reportService.getPurchaseByMonthByCustomer(action.query).pipe(
          map((pageable) => ReportPurchaseActions.loadPurchaseByMonthSuccess({ data: pageable })),
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
