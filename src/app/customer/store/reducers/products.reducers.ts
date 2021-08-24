import { createReducer, on } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";
import { Product } from "src/app/models/products";
import * as ProductActions from '../actions/products.actions';

export const productsFeatureKey = 'products';

export interface ProductState {
  pageable: Pageable

}

export const initialState: ProductState = {
  pageable:null,
}

export const productReducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, (state, action) =>({
    ...state,
  })),
  on(ProductActions.loadProductSuccess, (state, action) =>
  ({...state,
  pageable: action.pageable,
  })),
);
