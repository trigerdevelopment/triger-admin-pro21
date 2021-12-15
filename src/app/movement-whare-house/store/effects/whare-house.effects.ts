import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { WharehouseService } from "src/app/services/wharehouse.service";
import * as WhareHouseActions from '../actions/whare-house.actions';


@Injectable()
export class WhareHouseEffects {

  getWhareHouseMovByFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WhareHouseActions.loadWhareHouseMov),
      concatMap((action) =>
        this.wharehouseService.getWhareHouseMovByQuery(action.query).pipe(
          map((pageable) => WhareHouseActions.loadWhareHouseSuccess({ data: pageable })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions,
    private wharehouseService: WharehouseService,
    private route: Router
    ) {}

}
