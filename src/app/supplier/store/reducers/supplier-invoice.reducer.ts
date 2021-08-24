import { createReducer, on } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";

import * as supplierInvoiceActions from '../actions/supplier-invoice.actions';


export const supplierInvoiceFeatureKey = 'supplierinvoice';

export interface SupplierInvoiceState {
  pageable:Pageable,
  query:string,

}

export const initialState: SupplierInvoiceState = {

  pageable: {
  content: null,
 totalElements:null,
 totalPages: null,
 number: null,
 first: null,
 last: null,
 size:null,
 numberOfElements: null,
 pageNo: null
   },
 query:null,
 };


export const SUPPLIER_INVOICE_REDUCER = createReducer(
  initialState,

  on(supplierInvoiceActions.loadSupplierInvoices, (state, action) =>({
    ...state,
    query: action.query
  })),
  on(supplierInvoiceActions.loadAllInvoiceSupplierSuccess, (state, action) =>
  ({...state,
  pageable: action.data,
  // page: action.data,
  })),
  on(supplierInvoiceActions.deleteSupplierInvoice, (state, action) =>({
    ...state,
    id: action.id
  })),
on(supplierInvoiceActions.deleteInvoiceSuccess, (state, action) =>
  ({...state,
  // query: action.query

  })),

);

