
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as salesReducers from '../reducers/sales.reducers';

export const selectorSalesState = createFeatureSelector<salesReducers.SalesState>(
  salesReducers.salesFeatureKey
);

export interface SalesSupport {
  data: any[],

}

export const selectSalesSelectorModel = createSelector(
  selectorSalesState,
  (state: salesReducers.SalesState): SalesSupport => {
    return {
      // invoices: state.invoices,
      data: state.sales,

    };
  }
);
