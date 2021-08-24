import { createAction, props } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";
import { Product } from "src/app/models/products";


export const loadProducts = createAction(
  '[Form-Invoice Service] Load Products',
  props<{query:any}>()
);
export const loadProductSuccess = createAction(
  '[Invoice Component] Load Products Success',
  props<{pageable:Pageable}>()
);
