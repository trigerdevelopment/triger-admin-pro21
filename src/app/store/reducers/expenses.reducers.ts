import { createReducer, on } from "@ngrx/store";
import * as ExpensesActions from "../actions/expenses.actions";

export const expensesFeatureKey = 'Expenses';

export interface ExpensesState {
  data: any[]
}

export const ExpensesInitialState:ExpensesState = {
  data: null,
}


export const expensesReducer = createReducer(
  ExpensesInitialState,

  on(ExpensesActions.loadExpensesByMonth, (state, action) =>({
    ...state,
    query: action.query
  })),

  on(ExpensesActions.loadExpensesByMonthSuccess, (state, action) =>({
    ...state,
    data: action.data
  })),

  );
