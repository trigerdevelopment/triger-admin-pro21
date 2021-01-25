import { createReducer, on } from "@ngrx/store";
import { Filter } from "src/app/models/customer";
import { cargarSales, cargarSalesSuccess, getSalesByFilter } from "../actions/sales.actions";


export interface salesState {
  sales: any[],
  filter: Filter,
  loaded: boolean,
  loading: boolean,

}


export const initialState: salesState = {
  sales:null,
  filter: null,
  loaded: false,
  loading: false,
}

const _salesReducer = createReducer(initialState,

  on(cargarSales, state => ({ ...state, loading: true })),
  // on(cargarSalesSuccess, (state, { sales, filter }) => ({ ...state,loading:false,loaded:true,invoices: {...invoices}, filter: {...filter}})),
  on(getSalesByFilter, (state, { filter }) => ({ ...state,loading:false,loaded:true, filter: {...filter}})),
  // on(cargarInvoicesSuccess, (state, { invoices }) => ({ ...state,loading:false,loaded:true, invoices: {...invoices}})),
);

export function salesReducer( state, action) {
  return _salesReducer(state, action);
}
