import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";
import * as BankTransReducer from '../reducers/bank.transactions.reducers';

export const BankSelectorState = createFeatureSelector<BankTransReducer.BankMovState>(
  BankTransReducer.bankMovFeatureKey
);

export interface PaginatorBankTransSupport {
  pageable: Pageable,
  // page:Page

}

export const selectBankTransSupportModel = createSelector(
  BankSelectorState,
  (state: BankTransReducer.BankMovState): PaginatorBankTransSupport => {
    return {
      // invoices: state.invoices,
      pageable: state.pageable,

    };
  }
);
