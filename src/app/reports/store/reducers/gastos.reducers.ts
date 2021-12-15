import { createReducer, on } from "@ngrx/store";

import * as GastosActions from '../actions/gastos.actions';

export const gastosFeatureKey = 'gastosKey';

export interface GastosState {
  expenses: any[];
  query:any;
}

export const GastosInitialState:GastosState = {
  expenses: null,
  query: null
}


export const gastosReducer = createReducer(
  GastosInitialState,

  on(GastosActions.loadGastosByMonth, (state, action) =>({
    ...state,
    query: action.query
  })),
  on(GastosActions.loadGastosByMonthSuccess, (state, action) =>({
    ...state,
    expenses: action.data
  })),


  );
