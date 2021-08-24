import { createAction, props } from '@ngrx/store';
import { JwtDTO } from 'src/app/models/jwt-dto';
import { LoginUsuario } from 'src/app/models/login-usuario';

export const loginComponent = createAction
('[Login Component] Login User',
props<{ user:LoginUsuario }>());

export const isLoading = createAction
('[Login Component] Login User')

export const loginSuccess = createAction(
  '[Auth Effect] Login User Success',
  props<{ jwt: JwtDTO }>()
);

export const loginFailure = createAction(
  '[Auth Effect] Login User Failure',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Header&Sidebar Component] Logout User');
