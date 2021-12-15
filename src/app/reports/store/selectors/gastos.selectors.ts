
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as gastosReducers from '../reducers/gastos.reducers';

export const selectorGastosState = createFeatureSelector<gastosReducers.GastosState>(
  gastosReducers.gastosFeatureKey
);

export interface GastosSupport {
  data: any[],

}

export const selectGastosSelectorModel = createSelector(
  selectorGastosState,
  (state: gastosReducers.GastosState): GastosSupport => {
    return {
      // invoices: state.invoices,
      data: state.expenses,

    };
  }
);
