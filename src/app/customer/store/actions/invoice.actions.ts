import { createAction, props } from '@ngrx/store';
import { Customer, Invoice, Pageable } from 'src/app/models/customer';

export const loadInvoices = createAction(
  '[Filter Component] Load Invoices',
  props<{query:any}>()
);
export const loadInvoiceById = createAction(
  '[Invoice Details Component] Load Invoice By Id',
  props<{id:any}>()
);
export const loadInvoiceByIdSuccess = createAction(
  '[Invoice Effects] Load Invoice By Id Success',
  props<{invoice:Invoice}>()
);
export const createInvoice = createAction(
  '[Customer Invoice Component] Create Invoices',
  props<{invoice:any}>()
);
export const createInvoiceSuccess = createAction(
  '[Invoice Effects] Create Invoice Success',
  props<{invoice:any}>()
);

export const addInvoice = createAction(
  '[Invoice Form Component] Add Invoice',
  props<{url:any}>()
);

export const addInvoiceSuccess = createAction(
  '[Invoice Form Component] Add Invoice Success',
  props<{customers:Customer[]}>()
);

export const isLoadInvoices = createAction(
  '[Invoice Component] Load Invoices',
  props<{loadingInvoice:boolean}>()
);

export const loadInvoicesSuccess = createAction(
  '[Invoice Effects] Load Invoices Success',
  props<{ data: Pageable }>()
);

export const loadInvoicesFailure = createAction(
  '[Invoice] Load Invoices Failure',
  props<{ error: any }>()
);
export const deleteInvoice = createAction(
  '[Invoice List] Delete Invoice',
  props<{ id: any }>()
);
export const deleteInvoiceSuccess = createAction(
  '[Invoice Effects] Success Delete Invoice',
  props<{query:any}>()

);
export const deleteInvoiceFailure = createAction(
  '[Invoice Effects] Failure to Delete Invoice',
  props<{ error: any }>()
);
