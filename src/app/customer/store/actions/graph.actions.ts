import { createAction, props } from "@ngrx/store";
import { Graph } from "../reducers/graph.reducer";

export const loadGraphics = createAction(
  '[Customer-Invoice Component] Load Sales and Volume Graphics'
);
export const loadGrapBar = createAction(
  '[Invoice Component] Load Graphics',
  props<{query:any}>()
);

export const loadPieGraph = createAction(
  '[Chart-Pie-Customer] Load Pie Graphs',
  // props<{ url: string }>()
);

export const loadPieGraphByDate = createAction(
  '[Date-Picker-Component] Load Pie Graph By Date',
  props<{ query: string }>()
);
export const loadGraphByQuery = createAction(
  '[Filter-Component] Load Graph By Query',
  props<{ query: string }>()
);
export const loadBarGraphByDate = createAction(
  '[Date-Picker-Component] Load Bar Graph By Date',
  props<{ query: string }>()
);

export const loadPieGraphSuccess = createAction(
  '[from Graph Effects] Load Pie Graph Success',
  props<{ graph: Graph[] }>()
);

export const loadBarGraphSuccess = createAction(
  '[from Graph Effects] Load Bar Graph Success',
  props<{ barGraph: Graph[] }>()
);

