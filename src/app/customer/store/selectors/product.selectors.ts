import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";
import { Product } from "src/app/models/products";
import * as fromProducts from '../reducers/products.reducers';


export const selectCustomerState = createFeatureSelector<fromProducts.ProductState>(
  fromProducts.productsFeatureKey
);

export interface ProductSupport {
  pageable: Pageable;
   // page:Page

 }

 export const selectProductSupportModel = createSelector(
  selectCustomerState,
  (state: fromProducts.ProductState): ProductSupport => {
    return {
      // invoices: state.invoices,
      pageable: state.pageable,

    };
  }
);

