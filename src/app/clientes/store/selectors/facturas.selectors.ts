import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Filter, Invoice, Pageable } from "src/app/models/customer";
import { invoiceReducer, invoiceState } from "../reducers/facturas.reducer";


export const selectCustomerSupportFeature = createFeatureSelector<invoiceState>(
  'invoiceReducer'
);

export const selectName = createSelector(
  selectCustomerSupportFeature,
  (state: invoiceState) => state.filter
);


export interface PaginatorSupport {
  // invoices: Pageable;
  filter: Filter;
}

export const selectPaginatorSupportModel = createSelector(
  selectCustomerSupportFeature,
  (state: invoiceState): PaginatorSupport => {
    return {
      // invoices: state.invoices,
      filter: state.filter,
    };
  }
);

