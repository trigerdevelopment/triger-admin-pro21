
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as salesVolumeReducers from '../reducers/volume.reducers';

export const selectorSalesState = createFeatureSelector<salesVolumeReducers.SalesVolumeState>(
  salesVolumeReducers.salesVolumeFeatureKey
);

export interface SalesVolumeSupport {
  data: any[],

}

export const selectSalesSelectorModel = createSelector(
  selectorSalesState,
  (state: salesVolumeReducers.SalesVolumeState): SalesVolumeSupport => {
    return {
      // invoices: state.invoices,
      data: state.salesvolume,

    };
  }
);
