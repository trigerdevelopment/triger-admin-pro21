import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Customer, Invoice, Pageable } from 'src/app/models/customer';
import * as fromInvoice from '../reducers/invoice.reducer';

export const selectInvoiceState = createFeatureSelector<fromInvoice.InvoiceState>(
  fromInvoice.invoiceFeatureKey
);

export interface PaginatorSupport {
  pageable: Pageable,
  // page:Page

}

export interface InvoiceSupport {
  invoice: Invoice,

}

export interface QuerySupport {
 query: string,
  // page:Page

}

export interface CustomerSupport {
 customers: Customer[],
  // page:Page

}


export const selectInvoiceSupportModel = createSelector(
  selectInvoiceState,
  (state: fromInvoice.InvoiceState): PaginatorSupport => {
    return {
      // invoices: state.invoices,
      pageable: state.pageable,

    };
  }
);

export const selectInvoiceById = createSelector(
  selectInvoiceState,
  (state: fromInvoice.InvoiceState): InvoiceSupport => {
    return {
      invoice: state.invoice,

    };
  }
);

export const selectCustomerSupportModel = createSelector(
  selectInvoiceState,
  (state: fromInvoice.InvoiceState): CustomerSupport => {
    return {
      // invoices: state.invoices,
      customers: state.customers,

    };
  }
);

export const selectQuery = createSelector(
  selectInvoiceState,
  (state: {query}): QuerySupport => {
    return {
      // invoices: state.invoices,
      query: state.query,

    };
  }
);

// export interface PaginatorSupport {
//   // invoices: Pageable;
//   filter: Filter;
// }

export const selectAllInvoice = createSelector(
  selectInvoiceState,
  (state: fromInvoice.InvoiceState) => {state.pageable}
);
