import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../../services/shared/modal.service';
import { CrudService } from '../../../services/shared/crud.service';
import { Task } from '../../../models/task';
import { FormTaskService } from '../../../services/form-services/form-task.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { cargarTareas } from '../store/actions/task.actions';
import { Subscription } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  taskEnd: boolean = false;
  storeSuscribe: Subscription;



  constructor(
              public _modalService: ModalService,
              public _crudService: CrudService,
              public _formTaskService: FormTaskService,
              public store: Store<AppState>) { }


              ngOnDestroy(): void {
    this.storeSuscribe.unsubscribe();
  }

  ngOnInit() {
    // this._crudService.refreshNeeded$.subscribe(() => {
    //   this.getTasks();

    // });
    // this.getTasks();

     this.storeSuscribe =  this.store.select('tasks').subscribe((tasks) => {
        console.log('taslk ', tasks);
        if(tasks){
          console.log('ENTREMOS', tasks);

          this.tasks = tasks.tasks;

        }
      })


      this.store.dispatch(cargarTareas());
  }

  mostrarUserRegModal(){
    this._formTaskService.clearForm();
    this._modalService.mostrarModalTask();
  }

  getTasks() {
    this._crudService.getAllObjects('get-tasks').subscribe(res => {
      this.tasks = res;

    })
  }

  completed(u:Task){
    this.taskEnd = !u.completed;
    this._formTaskService.form.setValue(u);
    var dat = this._formTaskService.getDate(u.date);
    this._formTaskService.form.get('date').setValue(dat);
    var comp = this._formTaskService.getDate(u.completedDate);
    this._formTaskService.form.get('completedDate').setValue(comp);

    if(this.taskEnd){
      this._formTaskService.form.get('status').setValue('Terminada');
      this._formTaskService.form.get('completed').setValue(true);

    }
    if (!this.taskEnd) {
      this._formTaskService.form.get('status').setValue('En Proceso');
      this._formTaskService.form.get('completed').setValue(false);

    }
    this._formTaskService.onSubmit();

  }

  deleteTask(u:Task){
    this._formTaskService.form.setValue(u);
    var dat = this._formTaskService.getDate(u.date);
    this._formTaskService.form.get('date').setValue(dat);
    var comp = this._formTaskService.getDate(u.completedDate);
    this._formTaskService.form.get('completedDate').setValue(comp);
    Swal.fire({
      title: 'Esta segur@?',
      text: "Al borrar los datos no se podran recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._formTaskService.onDelete();
        Swal.fire(
          'Deleted!',
          'Your data  has been deleted.',
          'success'
        )
      }
    })
  }

  edit(user){
    this._formTaskService.editTask(user);
    this._modalService.mostrarModalTask();

  }



}
