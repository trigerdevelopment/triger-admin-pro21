import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { ErrorhandlerService } from 'src/app/services/interceptors/errorhandler.service';
import * as fromAuthActions from '../actions/auth.actions'

@Injectable()

 export class AlertEffect {


  //  unableToLogin$ = createEffect(
  //    () =>
  //    this.actions$.pipe(
  //      ofType(fromAuthActions.loginFailure),
  //      tap((err) => this.errorHandler.handleError(err.error))
  //      ),
  //      { dispatch: false }
  //      );

       unableToLogin$ = createEffect(
        () =>
        this.actions$.pipe(
          ofType(fromAuthActions.loginFailure),
          tap(() =>  this.alertService.error('Usuario o contrasena incorrecta!!', 'Error!'))
          ),
          { dispatch: false }
          );

          welcomeToLogin$ = createEffect(
            () =>
            this.actions$.pipe(
              ofType(fromAuthActions.loginSuccess),
              tap((jwt) =>  this.alertService.success('Bienvenid@!! ',`${jwt.jwt.usuarioDetails}` ))
              ),
              { dispatch: false }
              );

      //  constructor(private actions$: Actions, private errorHandler: ErrorhandlerService) {}
       constructor(private actions$: Actions, private alertService: ToastrService) {}

}
