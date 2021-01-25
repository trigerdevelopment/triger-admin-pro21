import { createAction, props } from "@ngrx/store";
import { Filter, Pageable, SalesReportFilter } from "src/app/models/customer";


export const getSalesReportByFilter = createAction(
  '[Facturas Header] get Sales',
  props<{ filter: SalesReportFilter }>()
);

export const cargarInvoices = createAction('[Invoices] Cargar Facturas');

export const cargarInvoicesSuccess = createAction(
  '[Invoices] cargar Invoices Success',
  props<{ invoices: Pageable, filter: Filter }>()
);
export const getSalesByFilter = createAction(
  '[Facturas Header] get Sales',
  props<{ filter: Filter }>()
);

export const isLoading = createAction
  ('[Facturas Component] Login User');

export const filterSortBy = createAction(
  '[Invoices] cargar Invoices Success',
  props<{ filter: Pageable }>()
);

export const filterBy = createAction(
  '[Filter Component] filter By',
  props<{ filter: Filter }>()
);
export const selectSortBy = createAction(
  '[Filter Component] filter Sort By',
  props<{ sortBy: boolean }>()
);
export const loadInvoiceFailure = createAction(
  '[Auth Effect] Login User Failure',
  props<{ error: any }>()
);
