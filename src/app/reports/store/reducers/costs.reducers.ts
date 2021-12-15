import { createReducer, on } from "@ngrx/store";

import * as CostsActions from '../actions/costs.actions';

export const costsFeatureKey = 'costsKey';

export interface CostsState {
  costs: any[];
  query:any;
}

export const CostsInitialState:CostsState = {
  costs: null,
  query: null
}


export const costsReducer = createReducer(
  CostsInitialState,

  on(CostsActions.loadCostsByMonth, (state, action) =>({
    ...state,
    query: action.query
  })),
  on(CostsActions.loadCostsByMonthSuccess, (state, action) =>({
    ...state,
    costs: action.data
  })),


  );
