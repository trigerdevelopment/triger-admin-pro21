import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Filter } from "src/app/models/customer";
import { customerState } from "../reducers/customers.reducer";




export const selectCustomerSupportFeature = createFeatureSelector<customerState>(
  'invoiceReducer'
);

export const selectName = createSelector(
  selectCustomerSupportFeature,
  (state: customerState) => state.filter
);


export interface PaginatorSupport {
  // invoices: Pageable;
  filter: Filter;
}

export const selectPaginatorSupportModel = createSelector(
  selectCustomerSupportFeature,
  (state: customerState): PaginatorSupport => {
    return {
      // invoices: state.invoices,
      filter: state.filter,
    };
  }
);

