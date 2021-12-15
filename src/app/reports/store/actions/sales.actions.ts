import { createAction, props } from "@ngrx/store";

export const loadSalesByMonth = createAction(
  '[Filter2 Component] Load Sales by Month',
  props<{query:any}>()
);

export const loadSalesByMonthSuccess = createAction(
  '[Sales Effects] Load Sales in Success',
  props<{data:any[]}>()
);
