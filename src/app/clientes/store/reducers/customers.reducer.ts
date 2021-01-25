import { createReducer, on } from "@ngrx/store";
import { Filter, Pageable, SalesReportFilter } from "src/app/models/customer";
import { FilterSalesReportComponent } from "../../filter-sales-report/filter-sales-report.component";
import { cargarInvoices, cargarInvoicesSuccess, getSalesByFilter } from "../actions/customer.actions";


export interface customerState {
  invoices: Pageable,
  filter: Filter,
  salesReportFilter: SalesReportFilter,
  loaded: boolean,
  loading: boolean,

}

export const initialState: customerState = {
  invoices:null,
  filter: null,
  salesReportFilter:null,
  loaded: false,
  loading: false,
}

const _customerReducer = createReducer(initialState,

  on(cargarInvoices, state => ({ ...state, loading: true })),
  on(cargarInvoicesSuccess, (state, { invoices, filter }) => ({ ...state,loading:false,loaded:true,invoices: {...invoices}, filter: {...filter}})),
  on(getSalesByFilter, (state, { filter }) => ({ ...state,loading:false,loaded:true, filter: {...filter}})),
  // on(cargarInvoicesSuccess, (state, { invoices }) => ({ ...state,loading:false,loaded:true, invoices: {...invoices}})),
);


export function customerReducer( state, action) {
  return _customerReducer(state, action);
}
