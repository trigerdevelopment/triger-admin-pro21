import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map } from "rxjs/operators";
import { GetService } from "src/app/services/get-service/get-service.service";
import { getSalesByFilter } from "../actions/facturas.actions";
import { cargarSalesSuccess, loadSalesFailure } from "../actions/sales.actions";



@Injectable()
export class FacturasEffects {

  constructor(
    private action$: Actions,
    private getService: GetService
  ) { }

  getInvoiceByFilter$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getSalesByFilter),
      concatMap((action) =>
        this.getService.getInvoiceByQuery(
          '/invoice/invoice-by-query',
          `iniDate=${action.filter.iniDate}&finalDate=${action.filter.finalDate}&serie=${action.filter.serie}&iniFolio=${action.filter.iniFolio}&finalFolio=${action.filter.finalFolio}&company=${action.filter.company}&sucursal=${action.filter.sucursal}&total=${action.filter.total}&total2=${action.filter.total2}`,
          action.filter.pageSize,action.filter.pageNo,action.filter.orderBy,action.filter.sortBy
          ).pipe(
          map((sales) => cargarSalesSuccess({ sales:[] , filter:action.filter })),
          catchError((error) => of(loadSalesFailure({ error })))
        )
      )
    );
  });

}
