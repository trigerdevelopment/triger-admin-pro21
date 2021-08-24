import { createAction, props } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";


export const loadProduction = createAction(
  '[Filter Component] Load Production',
  props<{query:any}>()
);
export const loadProductionById = createAction(
  '[Production Details Component] Load Production By Id',
  props<{id:any}>()
);
export const loadProductionByIdSuccess = createAction(
  '[Production Effects] Load Production By Id Success',
  props<{production:any}>()
);
export const createProduction = createAction(
  '[Customer Production Component] Create Production',
  props<{production:any}>()
);
export const createProductionSuccess = createAction(
  '[Production Effects] Create Production Success',
  props<{production:any}>()
);

export const addProduction = createAction(
  '[Production Form Component] Add Production',
  props<{url:any}>()
);

export const isLoadProduction = createAction(
  '[Production Component] Load Production',
  props<{loadingProduction:boolean}>()
);

export const loadProductionSuccess = createAction(
  '[Production Effects] Load Production Success',
  props<{ data: Pageable }>()
);

export const loadProductionFailure = createAction(
  '[Production] Load Production Failure',
  props<{ error: any }>()
);
export const deleteProduction = createAction(
  '[Production List] Delete Production',
  props<{ id: any }>()
);
export const deleteProductionSuccess = createAction(
  '[Production Effects] Success Delete Production',
  props<{query:any}>()

);
export const deleteProductionFailure = createAction(
  '[Production Effects] Failure to Delete Production',
  props<{ error: any }>()
);
