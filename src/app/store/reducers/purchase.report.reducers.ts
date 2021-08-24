
import { createReducer, on } from "@ngrx/store";
import * as ReportPurchaseActions from "../actions/purchase.report.actions";

export const reportFeatureKey = 'reportpurchase';

export interface ReportState {
  purchasedata:any[];
}

export const ReportInitialState:ReportState = {
  purchasedata: null,
}

export const reportReducer = createReducer(
  ReportInitialState,


  on(ReportPurchaseActions.loadPurchaseByMonth, (state, action) =>({
    ...state,
    query: action.query
  })),

  on(ReportPurchaseActions.loadPurchaseByMonthSuccess, (state, action) =>({
    ...state,
    purchasedata: action.data
  })),

  );
