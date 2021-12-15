import { createAction, props } from "@ngrx/store";

export const loadSalesVolumeByMonth = createAction(
  '[Filter Sales Volume Component] Load Sales Volume by Month',
  props<{query:any}>()
);

export const loadSalesVolumeByMonthSuccess = createAction(
  '[Sales Volume Effects] Load Sales Volume in Success',
  props<{data:any[]}>()
);
