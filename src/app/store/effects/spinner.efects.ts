import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/services/spiner.service';
import * as AuthActions from '../actions/auth.actions'
import * as FacturasActions from '../../clientes/store/actions/facturas.actions';

@Injectable()
export class SpinnerEffects {
  spinneron$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.loginComponent,
          FacturasActions.filterBy
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
          FacturasActions.cargarInvoicesSuccess,
          FacturasActions.loadInvoiceFailure
        ),
        tap(() => {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private spinner: SpinnerService) {}
}
