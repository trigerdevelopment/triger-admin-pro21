import { createReducer, on } from '@ngrx/store';
import { JwtDTO } from 'src/app/models/jwt-dto';
import { LoginUsuario } from 'src/app/models/login-usuario';
import * as AuthActions from '../actions/auth.actions'

export interface AuthState {
  user: LoginUsuario;
  userName:string;
  jwt: JwtDTO;
  error:any;
  isLoading: boolean;

}

export const initialState: AuthState = {
  user:null,
  userName: null,
  jwt: null,
  error:null,
  isLoading:false

}

const _authReducer = createReducer(initialState,

  on(AuthActions.loginComponent, (state, action) => {
    return {
      ...state,
      userName : action.user.nombreUsuario,
      error: null,
      isLoading:true
    };
  }),

  on(AuthActions.isLoading, (state, action) => {
    return {
      ...state,
     isLoading: true,
         error: null,
    };
  }),

  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      jwt  : action.jwt,
      error: null,
    };
  }),
  on(AuthActions.loginFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}
