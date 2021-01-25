import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/models/task';


export const cargarTareas = createAction('[Tareas] Cargar Tareas');

export const cargarTareasSuccess = createAction(
  '[Tareas] cargar Tareas Success',
  props<{tareas: Task[]}>()
  );
