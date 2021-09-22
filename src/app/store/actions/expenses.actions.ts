import { createAction, props } from "@ngrx/store";

export const loadExpensesByMonth = createAction(
  '[Filter Report Component] Load Expenses By Month',
  props<{query:any}>()
);
export const loadPurchaseByMonth = createAction(
  '[Filter Report Component] Load Purchase By Month',
  props<{query:any}>()
);
export const loadExpensesByMonthSuccess = createAction(
  '[Report Effects] Load Expenses By Month Success',
  props<{data:any[]}>()
);
export const loadPurchaseByMonthSuccess = createAction(
  '[Report Effects] Load Purchase By Month Success',
  props<{data:any[]}>()
);
