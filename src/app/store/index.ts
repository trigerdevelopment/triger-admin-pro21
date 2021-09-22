import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './reducers/auth.reducer';
import * as reportReducer from './reducers/report.reducers';
import * as expensesReducer from './reducers/expenses.reducers';
import * as reportPurchaseReducer from './reducers/purchase.report.reducers';


export interface AppState {

  [fromAuth.authFeatureKey]: fromAuth.State;
  [reportReducer.reportFeatureKey]: reportReducer.ReportState;
  [expensesReducer.expensesFeatureKey]: expensesReducer.ExpensesState;
  [reportPurchaseReducer.reportFeatureKey]: reportPurchaseReducer.ReportState
}

export const reducers: ActionReducerMap<AppState> = {

  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [reportReducer.reportFeatureKey]: reportReducer.reportReducer,
  [expensesReducer.expensesFeatureKey]: expensesReducer.expensesReducer,
  [reportPurchaseReducer.reportFeatureKey]: reportPurchaseReducer.reportReducer

};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
