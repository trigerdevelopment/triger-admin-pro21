import { createReducer, on } from "@ngrx/store";
import { Filter } from "src/app/models/customer";
import { selectFilter, selectSortBy } from "../actions/filter.actions";



export interface filterState {
  filter: Filter,
  sortBy: boolean

}

export const initialState: filterState = {
filter:null,
sortBy:false
}


const _filterReducer = createReducer(initialState,

  on(selectFilter, state => ({ ...state, loading: true })),
  // on(selectSortBy, (state, { filter }) => ({ ...state,loading:false,loaded:true, filter: {...filter}})),
);

export function filterReducer( state, action) {
  return _filterReducer(state, action);
}
