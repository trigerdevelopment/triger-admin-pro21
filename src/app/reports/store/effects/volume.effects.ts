import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { ReportsService } from "src/app/services/shared/reports.service";

import * as SalesVolumeActions from "../actions/volume.actions";



@Injectable()
export class SalesVolumeEffects {


  getGastosByMonth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SalesVolumeActions.loadSalesVolumeByMonth),
      concatMap((action) =>
        this.reportService.getVolumeSalesByMonth(action.query).pipe(
          map((pageable) => SalesVolumeActions.loadSalesVolumeByMonthSuccess({ data: pageable })),
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
