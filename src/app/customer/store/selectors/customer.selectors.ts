import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Customer, Pageable } from 'src/app/models/customer';
import * as fromCustomer from '../reducers/customer.reducers';


export const selectCustomerState = createFeatureSelector<fromCustomer.CustomerState>(
  fromCustomer.customerFeatureKey
);

export interface CustomerSupport {
  customers: any[];
   // page:Page

 }

 export interface CustomerSupportPageable {
  pageable: Pageable;
   // page:Page

 }

 export interface CustomerSupportId {
  customer: any;
   // page:Page

 }

 export const selectCustomerSupportModel = createSelector(
  selectCustomerState,
  (state: fromCustomer.CustomerState): CustomerSupport => {
    return {
      // invoices: state.invoices,
      customers: state.customers,

    };
  }
);

export const selectCustomerSupportModelByPage = createSelector(
  selectCustomerState,
  (state: fromCustomer.CustomerState): CustomerSupportPageable => {
    return {
      // invoices: state.invoices,
      pageable: state.pageable,

    };
  }
);

export const selectCustomerSupportById = createSelector(
  selectCustomerState,
  (state: fromCustomer.CustomerState): CustomerSupportId => {
    return {
      // invoices: state.invoices,
      customer: state.customer,

    };
  }
);
