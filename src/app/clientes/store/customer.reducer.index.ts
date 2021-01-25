import { ActionReducerMap } from "@ngrx/store";
import { invoiceReducer, invoiceState } from "./reducers/facturas.reducer";


export interface CustomerState {
  customer: invoiceState,
  // filter: Filter,
  // loaded: boolean,
  // loading: boolean,
}

export const customerReducers: ActionReducerMap<CustomerState> = {
  customer: invoiceReducer,

}
