import { createAction, props } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";


export const loadBankTransactions = createAction(
  '[Filter Bank Transactions Component] Load Bank Transactions',
);
export const loadBankTransactionsByQuery = createAction(
  '[Filter Bank Transactions Component] Load Bank Transactions By Query',
  props<{query:any}>()
);
export const loadBankMovementById = createAction(
  '[Bank Movement Details Component] Load Bank Movement By Id',
  props<{id:any}>()
);
export const loadBankMovementByIdSuccess = createAction(
  '[Bank Movement Effects] Load BankMovement By Id Success',
  props<{bankMovement:any}>()
);
export const createBankMovement = createAction(
  '[Bank Movement Component] Create Bank Transactions',
  props<{BankMovement:any}>()
);
export const createBankTransactionsuccess = createAction(
  '[BankMovement Effects] Create BankMovement Success',
  props<{BankMovement:any}>()
);

export const addBankMovement = createAction(
  '[BankMovement Form Component] Add BankMovement',
  props<{url:any}>()
);

export const addBankTransactionsuccess = createAction(
  '[Bank Movement Form Component] Add BankMovement Success',
  props<{bankMovements:any[]}>()
);

export const isLoadBankTransactions = createAction(
  '[Bank Movement Component] is Load Bank Transactions',
  props<{loadingBankMovement:boolean}>()
);

export const loadBankTransactionsSuccess = createAction(
  '[BankMovement Effects] Load BankTransactions Success',
  props<{ data: Pageable }>()
);

export const loadBankTransactionsFailure = createAction(
  '[BankMovement] Load BankTransactions Failure',
  props<{ error: any }>()
);
export const deleteBankMovement = createAction(
  '[BankMovement List] Delete BankMovement',
  props<{ id: any }>()
);
export const deleteBankTransactionsuccess = createAction(
  '[BankMovement Effects] Success Delete BankMovement',
  props<{query:any}>()

);
export const deleteBankMovementFailure = createAction(
  '[Bank Movement Effects] Failure to Delete BankMovement',
  props<{ error: any }>()
);
