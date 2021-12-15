import { createReducer, on } from "@ngrx/store";

import * as ReportActions from "../actions/report.actions";

export const reportFeatureKey = 'reports';

export interface ReportState {
  data: any[]
  purchasedata:any[];
  expenses: any[]
}

export const ReportInitialState:ReportState = {
  data: null,
  purchasedata: null,
  expenses: null
}

export const reportReducer = createReducer(
  ReportInitialState,

  on(ReportActions.loadSalesByMonth, (state, action) =>({
    ...state,
    query: action.query
  })),
  on(ReportActions.loadExpensesByMonth, (state, action) =>({
    ...state,
    query: action.query
  })),
  on(ReportActions.loadPurchaseByMonth, (state, action) =>({
    ...state,
    query: action.query
  })),
  on(ReportActions.loadSalesByMonthSuccess, (state, action) =>({
    ...state,
    data: action.data
  })),
  on(ReportActions.loadExpensesByMonthSuccess, (state, action) =>({
    ...state,
    expenses: action.data
  })),
  on(ReportActions.loadPurchaseByMonthSuccess, (state, action) =>({
    ...state,
    purchasedata: action.data
  })),

  );
