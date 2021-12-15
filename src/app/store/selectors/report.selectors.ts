import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromReportReducer from "../reducers/report.reducers";

export const selectorReportState = createFeatureSelector<fromReportReducer.ReportState>(
  fromReportReducer.reportFeatureKey
);

export interface ReportSupport {
  data: any[],

}
export interface ReportPurchaseSupport {
  purchasedata: any[],

}
export interface ExpensesSupport {
  expenses: any[],

}

export const selectInvoiceSupportModel = createSelector(
  selectorReportState,
  (state: fromReportReducer.ReportState): ReportSupport => {
    return {
      // invoices: state.invoices,
      data: state.data,

    };
  }
);

export const selectPurchaseSupportModel = createSelector(
  selectorReportState,
  (state: fromReportReducer.ReportState): ReportPurchaseSupport => {
    return {
      // invoices: state.invoices,
      purchasedata: state.data,

    };
  }
);

export const selectExpensesSupportModel = createSelector(
  selectorReportState,
  (state: fromReportReducer.ReportState): ExpensesSupport => {
    return {
      // invoices: state.invoices,
      expenses: state.data,

    };
  }
);
