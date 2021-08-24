import { createAction, props } from "@ngrx/store";


export const loadSalesByMonth = createAction(
  '[Filter Report Component] Load Sales By Month',
  props<{query:any}>()
);
export const loadPurchaseByMonth = createAction(
  '[Filter Report Component] Load Purchase By Month',
  props<{query:any}>()
);
export const loadSalesByMonthSuccess = createAction(
  '[Report Effects] Load Sales By Month Success',
  props<{data:any[]}>()
);
export const loadPurchaseByMonthSuccess = createAction(
  '[Report Effects] Load Purchase By Month Success',
  props<{data:any[]}>()
);
