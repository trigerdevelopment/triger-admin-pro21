import { createAction, props } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";


export const loadSupplierInvoices = createAction(
  '[Filter Component] Load Suppler Invoices',
  props<{query:any}>()
);
export const isLoadSupplierInvoices = createAction(
  '[Invoice Component] Load Invoices',
  props<{loadingInvoice:boolean}>()
);

export const loadAllInvoiceSupplierSuccess = createAction(
  '[Supplier Invoice Effects] Load All Invoice Supplier Success',
  props<{ data: Pageable }>()
);
export const deleteSupplierInvoice = createAction(
  '[Supplier Invoice List] Delete Supplier Invoice By Id',
  props<{ id: any }>()
);
export const deleteInvoiceSuccess = createAction(
  '[Supplier Invoice Effects] Success Delete Supplier Invoice',
  props<{query:any}>()

);
