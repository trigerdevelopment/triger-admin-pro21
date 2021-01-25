import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { AuthSessionService } from 'src/app/services/auth/auth-session.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as AuthActions from '../actions/auth.actions'

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

  goStoreToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((jwt) =>  {
          this.authSession.setToken(jwt.jwt.token);
          this.authSession.setUserName(jwt.jwt.nombreUsuario);
          this.authSession.setUserDetails(jwt.jwt.usuarioDetails);
          this.authSession.setAuthorities(jwt.jwt.authorities);
        })

      ),
    { dispatch: false }
  );

  goShopping$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.route.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );

  authFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(() => this.route.navigate(['/login']))
      ),
    { dispatch: false }
  );

    constructor(
      private actions$: Actions,
      private authService: AuthService,
      private route: Router,
      private authSession: AuthSessionService) {}
  }
