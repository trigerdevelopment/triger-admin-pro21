import { createReducer, on } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";

import * as BankMovActions from '../actions/bank.transactions.actions';

export const bankMovFeatureKey = 'bankMovements';

export interface BankMovState {

  pageable:Pageable,
  query:string,

}

export const BankMovInitialState:BankMovState = {
  pageable: {
    content: null,
   totalElements:null,
   totalPages: null,
   number: null,
   first: null,
   last: null,
   size:null,
   numberOfElements: null,
   pageNo: null
     },
  query:null,
}


export const bankmovreducer = createReducer(
  BankMovInitialState,

  on(BankMovActions.loadBankTransactions, (state) =>({
    ...state,
   })),
   on(BankMovActions.loadBankTransactionsByQuery, (state, action) =>({
     ...state,
     query: action.query
    })),
    on(BankMovActions.loadBankMovementById, (state, action) =>({
      ...state,
      id: action.id
    })),
    on(BankMovActions.loadBankMovementByIdSuccess, (state, action) =>({
      ...state,
      pageable: action.bankMovement
    })),
    on(BankMovActions.loadBankTransactionsSuccess, (state, action) =>({
      ...state,
      pageable: action.data
     })),

);


