import { createAction, props } from "@ngrx/store";
import { Customer, Pageable } from "src/app/models/customer";


export const loadCustomer = createAction(
  '[Form-Invoice Service] Load Customer',
);
export const loadCustomerByQuery = createAction(
  '[From-Customer Filter] Load Customers',
  props<{query:any}>()
);
export const addCustomer = createAction(
  '[Form-Customer] Add Customer',
  props<{customer: any}>()
);
export const loadCustomerById = createAction(
  '[Customer-List] Load Customer By Id',
  props<{id: any}>()
);
export const loadCustomerByIdSuccess = createAction(
  '[Customer-Effects] Load Customer By Id Success',
  props<{customer: any}>()
);
export const addCustomerSuccess = createAction(
  '[Form-Customer Effects] Add Customer Success',
  props<{customer:Customer}>()

);
export const createCustomerFailure = createAction(
  '[Invoice] Load Invoices Failure',
  props<{ error: any }>()
);
export const loadCustomerSuccessByAny = createAction(
  '[Invoice Component] Load Customer Success',
  props<{customers:any[]}>()
);
export const loadCustomersSuccessByPageable = createAction(
  '[Customer Effects] Load Customer Success',
  props<{data:Pageable}>()
);
