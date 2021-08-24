
// import { Graph } from './graph.model';
import * as GraphReducers from '../reducers/graph.reducer';

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Graph } from '../reducers/graph.reducer';

export const selectGraphState = createFeatureSelector<GraphReducers.GraphState>(
  GraphReducers.graphsFeatureKey
);

export interface Graphic {
  graph: Graph[],

}

export interface BarGraphic {
  barGraph: Graph[],

}

export const selectInvoiceSupportModel = createSelector(
  selectGraphState,
  (state: GraphReducers.GraphState): Graphic => {
    return {
      // invoices: state.invoices,
      graph: state.graph,

    };
  }
);

export const selectGraphBarSupport = createSelector(
  selectGraphState,
  (state: GraphReducers.GraphState): BarGraphic => {
    return {
      // invoices: state.invoices,
      barGraph: state.barGraph,

    };
  }
);
