import { createAction, props } from "@ngrx/store";

export const loadGastosByMonth = createAction(
  '[Filter2 Component] Carga Gastos por Mes',
  props<{query:any}>()
);

export const loadGastosByMonthSuccess = createAction(
  '[Gastos Effects] Load Gastos Success',
  props<{data:any[]}>()
);
