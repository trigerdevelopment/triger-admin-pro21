import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Pageable } from 'src/app/models/customer';
import * as fromProduct from '../reducers/product.reducer';

export const selectProductState = createFeatureSelector<fromProduct.ProductState>(
  fromProduct.productFeatureKey
);

export interface PaginatorProductSupport {
  pageable: Pageable,
  // page:Page

}

export const selectPaginatorSupportModel = createSelector(
  selectProductState,
  (state: fromProduct.ProductState): PaginatorProductSupport => {
    return {
      // invoices: state.invoices,
      pageable: state.pageable,

    };
  }
);
