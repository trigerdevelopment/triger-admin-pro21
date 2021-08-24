import { createAction, props } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";




export const loadSupplierByQuery = createAction(
  '[From-Supplier Filter] Load Suppliers By Query',
  props<{query:any}>()
);
export const loadSupplierByQuerySuccess = createAction(
  '[From-Supplier Effects] Load Suppliers By Query Success',
  props<{ data: Pageable }>()
);
export const loadSupplierById = createAction(
  '[Supplier-List-Component] Load Supplier By Id',
  props<{id: any}>()
);
export const loadSupplierByIdSuccess = createAction(
  '[Supplier-Effects] Load Supplier By Id Success',
  props<{supplier: any}>()
);
export const createSupplierFailure = createAction(
  '[Invoice Supplier Component] Create Supplier Failure',
  props<{ error: any }>()
);
// export const addSupplier = createAction(
//   '[Form-Customer] Add Supplier',
//   props<{customer: any}>()
// );
// export const loadSupplierById = createAction(
//   '[Supplier-List] Load Supplier By Id',
//   props<{id: any}>()
// );
// export const loadSupplierByIdSuccess = createAction(
//   '[Supplier-Effects] Load Supplier By Id Success',
//   props<{supplier: any}>()
// );
// export const addCustomerSuccess = createAction(
//   '[Form-Supplier Effects] Add Supplier Success',
//   props<{supplier:any}>()

// );
// export const createSupplierFailure = createAction(
//   '[Supplier Invoice] Load Supplier Failure',
//   props<{ error: any }>()
// );

