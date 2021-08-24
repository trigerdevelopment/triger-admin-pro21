import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";

import * as supplierReducer from "../reducers/supplier-invoice.reducer";


export const SELECTOR_SUPPLIER__INVOICE_STATE = createFeatureSelector<supplierReducer.SupplierInvoiceState>(
  supplierReducer.supplierInvoiceFeatureKey
);

export interface PaginatorSupport {
  pageable: Pageable,
  // page:Page

}

export const selectInvoiceSupportModel = createSelector(
  SELECTOR_SUPPLIER__INVOICE_STATE,
  (state: supplierReducer.SupplierInvoiceState): PaginatorSupport => {
    return {
      // invoices: state.invoices,
      pageable: state.pageable,

    };
  }
);
