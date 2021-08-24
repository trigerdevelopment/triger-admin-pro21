import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import * as InvoiceActions from '../../customer/store/actions/invoice.actions';
import * as CustomerActions from '../../customer/store/actions/customer.actions';



@Injectable()
export class AlertEffects {

  welcomeToLogin$ = createEffect(
    () =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap((jwt) =>  this.alertService.success('Bienvenid@!! ',`${jwt.jwt.usuarioDetails}` ))
      ),
      { dispatch: false }
      );

      ToLogout$ = createEffect(
    () =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap((jwt) =>  this.alertService.warning('Te esperamos pronto@!! '))
      ),
      { dispatch: false }
      );

      ToDeleteInvoice$ = createEffect(
    () =>
    this.actions$.pipe(
      ofType(InvoiceActions.deleteInvoiceSuccess),
      tap((jwt) =>  this.alertService.success('La Factura se borro de la Base de Datos ','Borrar Factura',{timeOut: 3000, progressBar: true}))
      ),
      { dispatch: false }
      );
      ToCreateeInvoice$ = createEffect(
    () =>
    this.actions$.pipe(
      ofType(InvoiceActions.createInvoiceSuccess, CustomerActions.addCustomerSuccess),
      tap(() =>  this.alertService.info('Los Datos se agregaron en la Base de Datos con exito'))
      ),
      { dispatch: false }
      );

    //   ToDeleteInvoiceFailure$ = createEffect(
    // () =>
    // this.actions$.pipe(
    //   ofType(InvoiceActions.deleteInvoiceFailure),
    //   tap((jwt) =>  this.alertService.error('Problemas al borrar Archivo de la Base de Datos ',`${jwt.error}`))
    //   ),
    //   { dispatch: false }
    //   );

      unableToLogin$ = createEffect(
        () =>
        this.actions$.pipe(
          ofType(AuthActions.loginFailure),
          tap(() =>  this.alertService.error('Usuario o contrasena incorrecta!!', 'Error!'))
          ),
          { dispatch: false }
          );

         errorSendData$ = createEffect(
        () =>
        this.actions$.pipe(
          ofType(CustomerActions.createCustomerFailure, InvoiceActions.deleteInvoiceFailure),
          tap(() =>  this.alertService.error('Error enviado desde el Servidor!'))
          ),
          { dispatch: false }
          );
  constructor(private actions$: Actions,private alertService: ToastrService) {}

}
