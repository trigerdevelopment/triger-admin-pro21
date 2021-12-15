
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as costsReducers from '../reducers/costs.reducers';

export const selectorCostsState = createFeatureSelector<costsReducers.CostsState>(
  costsReducers.costsFeatureKey
);

export interface CostsSupport {
  data: any[],

}

export const selectCostsSelectorModel = createSelector(
  selectorCostsState,
  (state: costsReducers.CostsState): CostsSupport => {
    return {
      // invoices: state.invoices,
      data: state.costs,

    };
  }
);
