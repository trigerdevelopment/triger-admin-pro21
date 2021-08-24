import { createReducer, on } from "@ngrx/store";

import * as GraphActions from '../actions/graph.actions';


export interface Graph {
  value: number;
  name: string;
}

export interface GraphBar {
  value: number;
  name: string;
}


export const graphsFeatureKey = 'graphs';

export interface GraphState {
  // additional entities state properties
  url:string,
  graph:Graph[],
  barGraph: Graph[]
}


export const initialState: GraphState = ({
  // additional entity state properties
  url:'',
  graph:null,
  barGraph:null
});


export const reducer = createReducer(
  initialState,

  on(GraphActions.loadGrapBar,
    (state, action) => ({
      ...state,
    })
  ),
  on(GraphActions.loadPieGraph,
    (state, action) => ({
      ...state,
    })
  ),
  on(GraphActions.loadPieGraphSuccess,
    (state, action) => ({
      ...state,
    graph: action.graph})
  ),
  on(GraphActions.loadBarGraphSuccess,
    (state, action) => ({
      ...state,
      barGraph: action.barGraph})
  ),


);
