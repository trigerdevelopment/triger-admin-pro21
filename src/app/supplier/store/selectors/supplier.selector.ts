import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";
import * as SupplierReducers from '../reducers/supplier.reducers';


export const SELECTOR_SUPPLIER_STATE = createFeatureSelector<SupplierReducers.SupplierState>(
  SupplierReducers.supplierFeatureKey
);

export interface SupplierSupport {
  pageable:Pageable,
  // query:string,

 }

 export interface SupplierSupportId {
  supplier: any;
   // page:Page

 }



 export const selectSupplierSupportModel = createSelector(
  SELECTOR_SUPPLIER_STATE,
  (state: SupplierReducers.SupplierState): SupplierSupport => {
    return {
      // invoices: state.invoices,
      pageable: state.pageable,

    };
  }
);

export const selectSupplierSupportById = createSelector(
  SELECTOR_SUPPLIER_STATE,
  (state: SupplierReducers.SupplierState): SupplierSupportId => {
    return {
      // invoices: state.invoices,
      supplier: state.supplier,

    };
  }
);
