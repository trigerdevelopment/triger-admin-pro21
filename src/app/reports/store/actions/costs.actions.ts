import { createAction, props } from "@ngrx/store";

export const loadCostsByMonth = createAction(
  '[Filter2 Component] Load Cost of Sales By Month',
  props<{query:any}>()
);

export const loadCostsByMonthSuccess = createAction(
  '[Costs Effects] Load Cost of Sales Success',
  props<{data:any[]}>()
);
