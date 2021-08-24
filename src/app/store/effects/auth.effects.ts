import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthSessionService } from 'src/app/services/auth/auth-session.service';

/* ---------------------------------------------------------------------
   Desde el Login Component mandamos el username y password is es corrcto
   pasa a registrar en el local storage.
   ----------------------------------------------------------------------
*/

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginComponent),
      concatMap((action) =>
        this.authService.postObject(action.user).pipe(
          map((jwt) => AuthActions.loginSuccess({ jwt: jwt })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    );
  });

  addUserToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) =>
          {
            this.authSession.setToken(action.jwt.token);
          this.authSession.setUserName(action.jwt.nombreUsuario);
          this.authSession.setUserDetails(action.jwt.usuarioDetails);
          this.authSession.setAuthorities(action.jwt.authorities);
          }
        )
      ),
    { dispatch: false }
  );

  removeUserFromLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() =>
        this.authSession.logOut()

        )
      ),
    { dispatch: false }
  );


  constructor(private actions$: Actions,
              private authSession: AuthSessionService,
              private authService: AuthService,
              private route: Router) {}

}
