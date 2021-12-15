import { createReducer, on } from "@ngrx/store";

import * as SalesActions from '../actions/sales.actions';

export const salesFeatureKey = 'salesKey';

export interface SalesState {
  sales: any[];
  query:any;
}

export const SalesInitialState:SalesState = {
  sales: null,
  query: null
}


export const salesReducer = createReducer(
  SalesInitialState,

  on(SalesActions.loadSalesByMonth, (state, action) =>({
    ...state,
    query: action.query
  })),
  on(SalesActions.loadSalesByMonthSuccess, (state, action) =>({
    ...state,
    sales: action.data
  })),


  );
