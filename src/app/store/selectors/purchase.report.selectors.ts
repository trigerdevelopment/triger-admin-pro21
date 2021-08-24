import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromReportPurchaseReducer from '../reducers/purchase.report.reducers';

export const selectorReportPurchaseState = createFeatureSelector<fromReportPurchaseReducer.ReportState>(
  fromReportPurchaseReducer.reportFeatureKey
);


export interface ReportPurchaseSupport {
  purchasedata: any[],

}

export const selectPurchaseSupportModel = createSelector(
  selectorReportPurchaseState,
  (state: fromReportPurchaseReducer.ReportState): ReportPurchaseSupport => {
    return {
      // invoices: state.invoices,
      purchasedata: state.purchasedata,

    };
  }
);
