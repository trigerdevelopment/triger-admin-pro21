import { createReducer, on } from "@ngrx/store";
import { Customer, Pageable } from "src/app/models/customer";
import * as CustomerActions from '../actions/customer.actions';

export const customerFeatureKey = 'customer';

export interface CustomerState {
  customers: any[];
  customer: any;
  pageable: Pageable;

}

export const initialState: CustomerState = {
  customer:null,
  customers:null,
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

export const reducer = createReducer(
  initialState,

  on(CustomerActions.loadCustomer, (state, action) =>({
    ...state,

  })),
  on(CustomerActions.addCustomer, (state, action) =>({
    ...state,
    customer: action.customer
  })),
  on(CustomerActions.addCustomerSuccess, (state, action) =>({
    ...state,
  })),
  on(CustomerActions.loadCustomerSuccessByAny, (state, action) =>
  ({...state,
  customers: action.customers,
  // page: action.data,
  })),
  on(CustomerActions.loadCustomersSuccessByPageable, (state, action) =>
  ({...state,
  pageable: action.data,
  // page: action.data,
  })),
  on(CustomerActions.loadCustomerById, (state, action) =>
  ({...state,
  pageable: action.id,
  // page: action.data,
  })),
  on(CustomerActions.loadCustomerByIdSuccess, (state, action) =>
  ({...state,
  customer: action.customer,
  // page: action.data,
  })),
);
