import { Action, createReducer, on } from '@ngrx/store';
import { Customer, Filter, Invoice, Pageable } from 'src/app/models/customer';
import * as InvoiceActions from '../actions/invoice.actions';

export const invoiceFeatureKey = 'invoice';

export interface InvoiceIdState {
  invooceId: Invoice
}

export interface InvoiceState {
   id:number,
   pageable:Pageable,
   invoice:Invoice,
   query:string,
   url:string,
   loadingInvoice:boolean
   customers: Customer[]


}

export const InvoiceIdInitialState:InvoiceIdState = {
  invooceId: null
}

export const initialState: InvoiceState = {
id:null,
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
  invoice:null,
url:null,
query:null,
loadingInvoice:null,
customers:null
};

export const reducer = createReducer(
  initialState,

  on(InvoiceActions.loadInvoices, (state, action) =>({
    ...state,
    query: action.query
  })),
  on(InvoiceActions.loadInvoiceById, (state, action) =>({
    ...state,
    id: action.id
  })),
  on(InvoiceActions.loadInvoiceByIdSuccess, (state, action) =>({
    ...state,
    invoice: action.invoice
  })),
  on(InvoiceActions.createInvoice, (state, action) =>({
    ...state,
    invoice: action.invoice
  })),
  on(InvoiceActions.addInvoice, (state, action) =>({
    ...state,
    url: action.url
  })),
  on(InvoiceActions.isLoadInvoices, (state, action) =>({
    ...state,
    loadingInvoice: action.loadingInvoice
  })),

  on(InvoiceActions.loadInvoicesSuccess, (state, action) =>
  ({...state,
  pageable: action.data,
  // page: action.data,
  })),
  on(InvoiceActions.addInvoiceSuccess, (state, action) =>
  ({...state,
  invoice: action.customers,
  // page: action.data,
  })),

  on(InvoiceActions.loadInvoicesFailure, (state, action) => (
    {...state,
    error: action.error})),
  on(InvoiceActions.deleteInvoice, (state, action) =>({
      ...state,
      id: action.id
    })),
  on(InvoiceActions.deleteInvoiceSuccess, (state, action) =>
    ({...state,
    // query: action.query

    })),
  on(InvoiceActions.deleteInvoiceFailure, (state, action) => {
    return{...state,
     error: action.error

    }}),
);

