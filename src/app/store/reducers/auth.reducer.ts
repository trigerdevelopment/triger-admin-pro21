import { Action, createReducer, on } from '@ngrx/store';
import { JwtDTO } from 'src/app/models/jwt-dto';
import { LoginUsuario } from 'src/app/models/login-usuario';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: LoginUsuario;
  jwt:JwtDTO;
}

export const initialState: State = {
  user: {
    nombreUsuario:null,
    password:null
  },
 jwt:{
   nombreUsuario: null,
   token:null,
   type:null,
   usuarioDetails:null,
   authorities:[]
 }
};


export const reducer = createReducer(
  initialState,

  on(AuthActions.loginComponent, (state, action) => {
    return {
      ...state,
      user : action.user,
      error: null,

    };
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      jwt : action.jwt,
      error: null,

    };
  }),

  on(AuthActions.loginFailure, (state, action) => {
    return {
      ...state,
      error: action.error,

    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      ...state,
      error: null,
      user: {
        nombreUsuario:null,
        password:null
      },
     jwt:{
       nombreUsuario: null,
       token:null,
       type:null,
       usuarioDetails:null,
       authorities:[]
     }
    };
  }),
);
  // on(AuthActions.loadAuthsSuccess, (state, action) => state),
  // on(AuthActions.loadAuthsFailure, (state, action) => state),


