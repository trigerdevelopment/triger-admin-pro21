import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  AuthState,
  authReducer,
} from '../reducers/auth.reducers';

export const authSelector = createFeatureSelector<AuthState>(
  'authReducer'
);

//Return name from feature
export const selectJwt = createSelector(
  authReducer,
  (state: AuthState) => state.jwt.token
);
