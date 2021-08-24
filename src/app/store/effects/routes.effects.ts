import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { loadInvoicesFailure } from 'src/app/customer/store/actions/invoice.actions';
import * as AuthActions from '../actions/auth.actions';
import * as InvoiceActions from '../../customer/store/actions/invoice.actions';


@Injectable()
export class RoutesEffects {
  goDashboard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.route.navigate(['dashboard']))
      ),
    { dispatch: false }
  );
  // error$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(loadInvoicesFailure),
  //       tap((error) => {

  //         console.log('ERROR ', error);


  //         this.route.navigate(['dashboard'])})
  //     ),
  //   { dispatch: false }
  // );


  goLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout, AuthActions.loginFailure),
        tap(() => this.route.navigate(['login']))
      ),
    { dispatch: false }
  );

  // goProductList$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(
  //         // fromProductActions.upsertProductSuccess,
  //         InvoiceActions.deleteInvoiceSuccess
  //       ),
  //       tap(() => this.route.navigate(['/customer/invoice']))
  //     ),
  //   { dispatch: false }
  // );



  constructor(private actions$: Actions,
             private route: Router) {}

}
