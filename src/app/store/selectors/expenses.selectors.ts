
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromExpensesReducer from "../reducers/expenses.reducers";

export const selectorExpensesState = createFeatureSelector<fromExpensesReducer.ExpensesState>(
  fromExpensesReducer.expensesFeatureKey
);


export interface ExpensesSupport {
  data: any[],

}


export const selectExpensesSupportModel = createSelector(
  selectorExpensesState,
  (state: fromExpensesReducer.ExpensesState): ExpensesSupport => {
    return {
      // invoices: state.invoices,
      data: state.data,

    };
  }
);
