import { createReducer, on } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";

import * as SupplierActions from "../actions/supplier.actions";


export const supplierFeatureKey = 'suppliers';

export interface SupplierState {
  suppliers: any[];
  supplier: any;
  pageable: Pageable;

}

export const initialState: SupplierState = {
  supplier:null,
  suppliers:null,
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
}

export const SUPPLIER_REDUCER = createReducer(
  initialState,

  on(SupplierActions.loadSupplierByQuery, (state, action) =>({
    ...state,

  })),
  on(SupplierActions.loadSupplierByQuerySuccess, (state, action) =>({
    ...state,
    pageable: action.data
  })),
  // on(SupplierActions.addCustomerSuccess, (state, action) =>({
  //   ...state,
  // })),
  // on(SupplierActions.loadSupplierByIdSuccess, (state, action) =>
  // ({...state,
  // supplier: action.supplier,
  // // page: action.data,
  // })),

  // on(SupplierActions.loadSupplierById, (state, action) =>
  // ({...state,
  // pageable: action.id,
  // // page: action.data,
  // })),
  // on(SupplierActions.loadSupplierByIdSuccess, (state, action) =>
  // ({...state,
  // supplier: action.supplier,
  // // page: action.data,
  // })),
);
