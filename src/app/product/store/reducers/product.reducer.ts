import { query } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { Pageable } from 'src/app/models/customer';
import * as ProductActions from '../actions/product.actions';

export const productFeatureKey = 'product';

export interface ProductState {
    pageable:Pageable
}

export const initialState: ProductState = {
  pageable: {
    content: [],
   totalElements:null,
   totalPages: null,
   number: null,
   first: null,
   last: null,
   size:null,
   numberOfElements: null,
   pageNo: null
     },
};


export const reducer = createReducer(
  initialState,

  on(ProductActions.loadProducts,(state,action) =>({
    ...state,
  query:action.query})),

  on(ProductActions.loadProductsSuccess, (state, action) => ({
    ...state,
  pageable: action.data})),

  on(ProductActions.loadProductsFailure, (state, action) => state),

);

