import { createReducer, on } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";

import * as WhareHouseActions from "../actions/whare-house.actions";

export const wharehouseFeatureKey = 'wharehouse';



export interface WhareHouseState {
   pageable:Pageable,
   query:string,
   loadingInvoice:boolean

}


export const initialState: WhareHouseState = {
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
loadingInvoice:null,
};

export const reducer = createReducer(
  initialState,

  on(WhareHouseActions.loadWhareHouseMov, (state, action) =>({
    ...state,
    query: action.query
  })),
  // on(InvoiceActions.loadInvoiceById, (state, action) =>({
  //   ...state,
  //   id: action.id
  // })),
  // on(InvoiceActions.loadInvoiceByIdSuccess, (state, action) =>({
  //   ...state,
  //   invoice: action.invoice
  // })),
  // on(InvoiceActions.createInvoice, (state, action) =>({
  //   ...state,
  //   invoice: action.invoice
  // })),
  // on(InvoiceActions.addInvoice, (state, action) =>({
  //   ...state,
  //   url: action.url
  // })),
  // on(InvoiceActions.isLoadInvoices, (state, action) =>({
  //   ...state,
  //   loadingInvoice: action.loadingInvoice
  // })),

  on(WhareHouseActions.loadWhareHouseSuccess, (state, action) =>
  ({...state,
  pageable: action.data,
  // page: action.data,
  })),
  // on(InvoiceActions.addInvoiceSuccess, (state, action) =>
  // ({...state,
  // invoice: action.customers,
  // // page: action.data,
  // })),

  // on(InvoiceActions.loadInvoicesFailure, (state, action) => (
  //   {...state,
  //   error: action.error})),
  // on(InvoiceActions.deleteInvoice, (state, action) =>({
  //     ...state,
  //     id: action.id
  //   })),
  // on(InvoiceActions.deleteInvoiceSuccess, (state, action) =>
  //   ({...state,
  //   // query: action.query

  //   })),
  // on(InvoiceActions.deleteInvoiceFailure, (state, action) => {
  //   return{...state,
  //    error: action.error

  //   }}),
);

