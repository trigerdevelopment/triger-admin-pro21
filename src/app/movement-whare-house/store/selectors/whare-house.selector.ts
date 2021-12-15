import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";
import * as fromWhareHouseReducer from "../reducers/whare-house.reducer";

export const selectorWhareHouseState = createFeatureSelector<fromWhareHouseReducer.WhareHouseState>(
  fromWhareHouseReducer.wharehouseFeatureKey
);

export interface PaginatorSupport {
  pageable: Pageable,
  // page:Page

}


export const selectInvoiceSupportModel = createSelector(
  selectorWhareHouseState,
  (state: fromWhareHouseReducer.WhareHouseState): PaginatorSupport => {
    return {
      // invoices: state.invoices,
      pageable: state.pageable,

    };
  }
);
