import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { CrudService } from '../../../../services/shared/crud.service';
import { cargarTareas, cargarTareasSuccess } from '../actions/task.actions';


@Injectable()
export class TareasEffects {
urlquery:string = "/invoice/invoice-by-query";
pageSize:any= "10";
pageNo:any ="0";
orderBy:boolean=false;
sortBy:string = 'fecha';
  constructor(
    private action$: Actions,
    private getService: CrudService
  ) { }

  cargarTareas$ = createEffect(
    ()=> this.action$.pipe(
      ofType(cargarTareas),
       mergeMap(
           ()=> this.getService.getAllObjects('get-tasks')
          //  ()=> this.getService.getUsers()
           .pipe(
             map(invo=> cargarTareasSuccess({tareas:invo}))
           )
         )
        //  tap(data=> console.log('data effect ', data),

         )

       )

}
