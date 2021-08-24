import { createAction, props } from '@ngrx/store';
import { Pageable } from 'src/app/models/customer';
import { pageable } from 'src/app/services/get-service/get-service.service';

export const loadProducts = createAction(
  '[Product] Load Products',
  props<{query:string}>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ data: Pageable }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);
