import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map } from "rxjs/operators";
import { SupplierService } from "src/app/services/supplier.service";

import * as SupplierActions from '../actions/supplier.actions';


@Injectable()
export class SupplierEffects {

  getSuppliers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SupplierActions.loadSupplierByQuery),
      concatMap((action) =>
        this.supplierService.getAllSupplierByQuery(action.query).pipe(
          map((pageable) => SupplierActions.loadSupplierByQuerySuccess({ data: pageable })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });

  // getCustomerByFilter$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(CustomerActions.loadCustomerByQuery),
  //     concatMap((action) =>
  //       this.customerService.getAllCustomerByQuery( action.query).pipe(
  //         map((pageable) => CustomerActions.loadCustomersSuccessByPageable({ data: pageable })),
  //         // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
  //       )
  //     )
  //   );
  // });

  // createCustomer$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(CustomerActions.addCustomer),
  //     concatMap((action) =>
  //       this.customerService.createCustomer(action.customer).pipe(
  //         map((customer) => CustomerActions.addCustomerSuccess({ customer: customer})),
  //         catchError((error) => of(CustomerActions.createCustomerFailure({ error })))
  //       )
  //     )
  //   );
  // });

  // ToCleanCustomerForm$ = createEffect(
  //   () =>
  //   this.actions$.pipe(
  //     ofType(CustomerActions.addCustomerSuccess),
  //     tap(() =>  this.customerformservice.cleanForm())
  //     ),
  //     { dispatch: false }
  //     );

      loadSupplierById$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(SupplierActions.loadSupplierById),
          concatMap((action) =>
            this.supplierService.getSupplierById(action.id).pipe(
              map((supplier) => SupplierActions.loadSupplierByIdSuccess({ supplier: supplier})),
              catchError((error) => of(SupplierActions.createSupplierFailure({ error })))
            )
          )
        );
      });

  constructor(private actions$: Actions,
    private supplierService: SupplierService,
    // private customerformservice: AddCustomerFormService
    ) {}

  }
