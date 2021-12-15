import { createReducer, on } from "@ngrx/store";

import * as SalesVolumeActions from '../actions/volume.actions';

export const salesVolumeFeatureKey = 'salesVolumeKey';

export interface SalesVolumeState {
  salesvolume: any[];
  query:any;
}

export const salesVolumeInitialState:SalesVolumeState = {
  salesvolume: null,
  query: null
}


export const salesVolumeReducer = createReducer(
  salesVolumeInitialState,

  on(SalesVolumeActions.loadSalesVolumeByMonth, (state, action) =>({
    ...state,
    query: action.query
  })),
  on(SalesVolumeActions.loadSalesVolumeByMonthSuccess, (state, action) =>({
    ...state,
    salesvolume: action.data
  })),


  );
