import { createReducer, on } from "@ngrx/store";

import * as ReportActions from "../actions/report.actions";

export const reportFeatureKey = 'reports';

export interface ReportState {
  data: any[]
  purchasedata:any[];
}

export const ReportInitialState:ReportState = {
  data: null,
  purchasedata: null,
}

export const reportReducer = createReducer(
  ReportInitialState,

  on(ReportActions.loadSalesByMonth, (state, action) =>({
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
  on(ReportActions.loadPurchaseByMonthSuccess, (state, action) =>({
    ...state,
    purchasedata: action.data
  })),

  );
