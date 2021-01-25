import { createAction, props } from "@ngrx/store";
import { Filter, SalesReportFilter } from "src/app/models/customer";


export const cargarSales = createAction('[Invoices] Cargar Ventas');

export const cargarSalesSuccess = createAction(
  '[Invoices] cargar Ventas Success',
  props<{ sales:any[], filter: SalesReportFilter }>()
);
export const getSalesByFilter = createAction(
  '[Facturas Header] get Sales by Filter',
  props<{ filter: SalesReportFilter }>()
);

export const isLoading = createAction
  ('[Facturas Component] Sales Loading');


export const loadSalesFailure = createAction(
  '[Auth Effect] Loading Sales Failure',
  props<{ error: any }>()
);
