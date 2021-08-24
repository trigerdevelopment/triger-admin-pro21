import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, mergeMap } from "rxjs/operators";
import { InvoiceService } from "src/app/services/invoice.service";

import * as supplierInvoiceActions from "../actions/supplier-invoice.actions"

@Injectable()
export class SupplierInvoiceEffects {

  getSupplierInvoiceByFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(supplierInvoiceActions.loadSupplierInvoices, supplierInvoiceActions.deleteInvoiceSuccess),
      concatMap((action) =>
        this.invoiceService.getAllSupplierInvoiceByQuery(action.query).pipe(
          map((pageable) => supplierInvoiceActions.loadAllInvoiceSupplierSuccess({ data: pageable })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });

  deleteSupplierInvoiceById$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(supplierInvoiceActions.deleteSupplierInvoice),
        mergeMap((action) =>
          this.invoiceService.deleteInvoiceById(action.id).pipe(
            map((query)=> supplierInvoiceActions.deleteInvoiceSuccess(query)),
            // catchError((error)=>of(InvoiceActions.deleteInvoiceFailure({error})))
          ))
      ),
    // { dispatch: false }
  );


  constructor(private actions$: Actions,
    private invoiceService: InvoiceService,
    private route: Router
    ) {}

  }
