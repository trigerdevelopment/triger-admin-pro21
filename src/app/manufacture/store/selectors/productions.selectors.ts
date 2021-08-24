import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";

import * as ProductionReducers from '../reducers/productions.reducers';

export const selectInvoiceState = createFeatureSelector<ProductionReducers.ProductionState>(
  ProductionReducers.ProductionFeatureKey
);

export interface PaginatorSupport {
  pageable: Pageable,
  // page:Page

}

export const selectInvoiceSupportModel = createSelector(
  selectInvoiceState,
  (state: ProductionReducers.ProductionState): PaginatorSupport => {
    return {
      // invoices: state.invoices,
      pageable: state.pageable,

    };
  }
);

