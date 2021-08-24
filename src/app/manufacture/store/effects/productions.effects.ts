import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { ProduccionService } from "src/app/services/produccion.service";

import * as ProductionActions from '../actions/production.actions';


@Injectable()
export class ProductionEffects {

  getInvoiceByFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductionActions.loadProduction,ProductionActions.deleteProductionSuccess),
      concatMap((action) =>
        this.produccionService.getProductionByQuery(action.query).pipe(
          map((pageable) => ProductionActions.loadProductionSuccess({ data: pageable })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });

  deleteById$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductionActions.deleteProduction),
        mergeMap((action) =>
          this.produccionService.deleteProductionById(action.id).pipe(
            map((query)=> ProductionActions.deleteProductionSuccess(query)),
            catchError((error)=>of(ProductionActions.deleteProductionFailure({error})))
          ))
      ),
    // { dispatch: false }
  );

  constructor(private actions$: Actions,
    private produccionService: ProduccionService
    ) {}

}
