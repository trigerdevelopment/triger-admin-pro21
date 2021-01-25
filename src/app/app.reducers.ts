import { ActionReducerMap } from '@ngrx/store';
import { invoiceReducer, invoiceState } from './clientes/store/reducers/facturas.reducer';
import { taskReducer, taskState } from './pages/task/store/reducers/task.reducers';
import { authReducer, AuthState } from './store/reducers/auth.reducers';


export interface AppState {
 tasks: taskState
//  invoices: invoiceState,
 auth: AuthState

}


export const appReducers: ActionReducerMap<AppState> = {
  tasks: taskReducer,
  // invoices: invoiceReducer,
  auth: authReducer
}
