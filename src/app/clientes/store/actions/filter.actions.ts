import { createAction, props } from "@ngrx/store";
import { Filter } from "src/app/models/customer";

export const filterSelect = createAction('[Invoices] Cargar Facturas');

export const selectFilter = createAction(
  '[Filter Component] filterSortBy',
  props<{filter: Filter}>()
  );
export const selectSortBy = createAction(
  '[Filter Component] filterSortBy',
  props<{sortBy:boolean}>()
  );
