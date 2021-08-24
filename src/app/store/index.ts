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
import * as reportPurchaseReducer from './reducers/purchase.report.reducers';


export interface AppState {

  [fromAuth.authFeatureKey]: fromAuth.State;
  [reportReducer.reportFeatureKey]: reportReducer.ReportState;
  [reportPurchaseReducer.reportFeatureKey]: reportPurchaseReducer.ReportState
}

export const reducers: ActionReducerMap<AppState> = {

  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [reportReducer.reportFeatureKey]: reportReducer.reportReducer,
  [reportPurchaseReducer.reportFeatureKey]: reportPurchaseReducer.reportReducer

};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
