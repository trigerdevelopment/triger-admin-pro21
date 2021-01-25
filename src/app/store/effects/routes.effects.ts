import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions'


@Injectable()
export class RoutesEffects {

  // goDashboardg$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.loginSuccess),
  //       tap(() => this.route.navigate(['/dashboard']))
  //     ),
  //   { dispatch: false }
  // );

  constructor(private actions$: Actions, private route: Router){}
}
