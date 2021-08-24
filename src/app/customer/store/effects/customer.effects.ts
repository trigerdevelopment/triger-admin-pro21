import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, tap } from "rxjs/operators";
import { CustomerService } from "src/app/services/customer.service";
import { AddCustomerFormService } from "../../add-customer/add-customer-form.service";
import * as CustomerActions from '../actions/customer.actions';

@Injectable()
export class CustomerEffects {

  getCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerActions.loadCustomer),
      concatMap((action) =>
        this.customerService.getAllCustomer().pipe(
          map((customer) => CustomerActions.loadCustomerSuccessByAny({ customers: customer })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });

  getCustomerByFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerActions.loadCustomerByQuery),
      concatMap((action) =>
        this.customerService.getAllCustomerByQuery( action.query).pipe(
          map((pageable) => CustomerActions.loadCustomersSuccessByPageable({ data: pageable })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });

  createCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerActions.addCustomer),
      concatMap((action) =>
        this.customerService.createCustomer(action.customer).pipe(
          map((customer) => CustomerActions.addCustomerSuccess({ customer: customer})),
          catchError((error) => of(CustomerActions.createCustomerFailure({ error })))
        )
      )
    );
  });

  ToCleanCustomerForm$ = createEffect(
    () =>
    this.actions$.pipe(
      ofType(CustomerActions.addCustomerSuccess),
      tap(() =>  this.customerformservice.cleanForm())
      ),
      { dispatch: false }
      );

      loadCustomerById$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(CustomerActions.loadCustomerById),
          concatMap((action) =>
            this.customerService.getCustomerById(action.id).pipe(
              map((customer) => CustomerActions.loadCustomerByIdSuccess({ customer: customer})),
              catchError((error) => of(CustomerActions.createCustomerFailure({ error })))
            )
          )
        );
      });

  constructor(private actions$: Actions,
    private customerService: CustomerService,
    private customerformservice: AddCustomerFormService
    ) {}

  }
