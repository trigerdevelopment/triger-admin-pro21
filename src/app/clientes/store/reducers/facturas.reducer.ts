import { createReducer, on } from '@ngrx/store';
import { Page } from 'ngx-pagination/dist/pagination-controls.directive';
import { Filter, Invoice, Pageable } from 'src/app/models/customer';
import { cargarInvoices, cargarInvoicesSuccess, getSalesByFilter } from '../actions/facturas.actions';



export interface invoiceState {
  invoices: Pageable,
  filter: Filter,
  loaded: boolean,
  loading: boolean,

}


export const initialState: invoiceState = {
  invoices:null,
  filter: null,
  loaded: false,
  loading: false,
}

const _invoiceReducer = createReducer(initialState,

  on(cargarInvoices, state => ({ ...state, loading: true })),
  on(cargarInvoicesSuccess, (state, { invoices, filter }) => ({ ...state,loading:false,loaded:true,invoices: {...invoices}, filter: {...filter}})),
  on(getSalesByFilter, (state, { filter }) => ({ ...state,loading:false,loaded:true, filter: {...filter}})),
  // on(cargarInvoicesSuccess, (state, { invoices }) => ({ ...state,loading:false,loaded:true, invoices: {...invoices}})),
);

export function invoiceReducer( state, action) {
  return _invoiceReducer(state, action);
}
