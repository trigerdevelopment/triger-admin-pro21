import { createAction, props } from "@ngrx/store";


export const loadPurchaseByMonth = createAction(
  '[Filter Report Component] Load Purchase By Month',
  props<{query:any}>()
);

export const loadPurchaseByMonthSuccess = createAction(
  '[Report Effects] Load Purchase By Month Success',
  props<{data:any[]}>()
);
