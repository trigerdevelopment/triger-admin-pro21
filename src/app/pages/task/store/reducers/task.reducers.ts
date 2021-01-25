import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/models/task';
import { cargarTareas, cargarTareasSuccess } from '../actions/task.actions';

export interface taskState {
    tasks: Task[];
    loading: boolean;
    loaded: boolean;
}

export const initialState: taskState = {
   tasks: [],
   loading:false,
   loaded:false
}

const _taskReducer = createReducer(initialState,

  on(cargarTareas, state => ({ ...state, loading: true })),
  on(cargarTareasSuccess, (state, { tareas }) => ({ ...state,loading:false, loaded:true, tasks: [ ...tareas ] })),
);


export function taskReducer(state, action) {
    return _taskReducer(state, action);
}
