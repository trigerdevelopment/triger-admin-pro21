import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import {of } from 'rxjs';

import * as InvoiceActions from '../actions/invoice.actions';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Router } from '@angular/router';



@Injectable()
export class InvoiceEffects {

  // getAllInvoice$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(InvoiceActions.deleteInvoiceSuccess),
  //     concatMap(() =>
  //       this.invoiceService.getAllInvoice().pipe(
  //         map((pageable) => InvoiceActions.loadInvoicesSuccess({ data: pageable })),
  //         // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
  //       )
  //     )
  //   );
  // });

  getInvoiceByFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvoiceActions.loadInvoices,InvoiceActions.deleteInvoiceSuccess),
      concatMap((action) =>
        this.invoiceService.getAllInvoiceByQuery(action.query).pipe(
          map((pageable) => InvoiceActions.loadInvoicesSuccess({ data: pageable })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });

  getInvoiceById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvoiceActions.loadInvoiceById),
      concatMap((action) =>
        this.invoiceService.getInvoiceById(action.id).pipe(
          map((invoice) => InvoiceActions.loadInvoiceByIdSuccess({ invoice: invoice })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });

 createInvoice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvoiceActions.createInvoice),
      concatMap((action) =>
        this.invoiceService.addInvoice(action.invoice).pipe(
          map((inv) => InvoiceActions.createInvoiceSuccess({invoice: inv})),
          catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });

  // getInvoicesByDeleting$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(InvoiceActions.deleteInvoiceSuccess),
  //     concatMap((action) =>
  //       this.invoiceService.getAllInvoice('').pipe(
  //         map((pageable) => InvoiceActions.loadInvoicesSuccess({ data: pageable })),
  //         // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
  //       )
  //     )
  //   );
  // });


  deleteById$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(InvoiceActions.deleteInvoice),
        mergeMap((action) =>
          this.invoiceService.deleteInvoiceById(action.id).pipe(
            map((query)=> InvoiceActions.deleteInvoiceSuccess(query)),
            catchError((error)=>of(InvoiceActions.deleteInvoiceFailure({error})))
          ))
      ),
    // { dispatch: false }
  );


  // addInvoice$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(InvoiceActions.addInvoice),
  //     concatMap((action) =>
  //       this.invoiceService.getAllObjects(action.url).pipe(
  //         map((customers) => InvoiceActions.addInvoiceSuccess({ customers:customers })),
  //         // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
  //       )
  //     )
  //   );
  // });




  constructor(private actions$: Actions,
              private invoiceService: InvoiceService,
              private route: Router
              ) {}

}
