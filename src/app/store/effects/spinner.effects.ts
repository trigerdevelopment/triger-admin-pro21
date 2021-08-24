import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as invoiceActions from 'src/app/customer/store/actions/invoice.actions';
import { SpinnerService } from 'src/app/services/spiner.service';
import * as AuthActions from '../actions/auth.actions';
import * as CustomerActions from '../../customer/store/actions/customer.actions';


@Injectable()
export class SpinnerEffects {

  spinneron$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.loginComponent,
          invoiceActions.loadInvoices,
          invoiceActions.loadInvoiceById,
          invoiceActions.createInvoice,
          CustomerActions.addCustomer,
        ),
        tap(() => this.spinner.show())
      ),
    { dispatch: false }
  );

  spinneroff$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.loginSuccess,
          AuthActions.loginFailure,
          invoiceActions.loadInvoicesSuccess,
          invoiceActions.loadInvoiceByIdSuccess,
          invoiceActions.createInvoiceSuccess,
          CustomerActions.addCustomerSuccess,

        ),
        tap(() => this.spinner.hide())
      ),
    { dispatch: false }
  );




  constructor(private actions$: Actions,
              private spinner: SpinnerService) {}

}
