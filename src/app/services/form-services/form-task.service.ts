import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { UploadService } from '../shared/upload.service';
import { AuthSessionService } from '../auth/auth-session.service';

@Injectable({
  providedIn: 'root'
})
export class FormTaskService {

  tasks: NuevoUsuario[] = [];
  taskId: boolean = false;
  isspinner:boolean = false;


  constructor(
    public _formBuilder: FormBuilder,
    public _upload: UploadService,
    public _authService: AuthSessionService,
    public _crud: CrudService) {
    this.taskId = false;
  }


  form: FormGroup = this._formBuilder.group({
    id: [''],
    task: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
    asignedTo: ['', Validators.required],
    status: ['', Validators.required],
    priority: ["", Validators.required],
    requestby: [""],
    date: ["", Validators.required],
    completedDate: ['', Validators.required],
    completed: ['']

  });

  editTask(task: any) {

    this.taskId = true;
    this.form.get('requestby').setValue(this._authService.getUserDetails());
    this.form.get('id')!.setValue(task.id);
    this.form.get('task')!.setValue(task.task);
    this.form.get('asignedTo')!.setValue(task.asignedTo);
    this.form.get('status')!.setValue(task.status);
    this.form.get('priority')!.setValue(task.priority);
    var date = this.getDate(task.date);
    var completedDate = this.getDate(task.completedDate);
    this.form.get('date').setValue(date);
    this.form.get('completedDate').setValue(completedDate);
    this.form.get('completed')!.setValue(task.completed);

  }

  onSubmit() {
    this.isspinner=true;
    this.form.get('requestby').setValue(this._authService.getUserDetails());
     this._crud.createObject(this.form.value, 'task/new').subscribe(res => {
       this.tasks = res;
       this.isspinner=false;
         Swal.fire({
          icon: 'success',
          title: 'Nueva Tarea',
          text: 'Tarea se agrego en la Base de Datos',
        });
        this.clearForm();
     })



  }

  onEdit() {
     this._crud.createObject(this.form.value, 'task/new').subscribe(res => {
      this.tasks = res;
      Swal.fire({
        icon: 'success',
        title: 'Tarea Actualizada',
        text: 'Tarea Actualizada en la Base de Datos',
      });
      this.clearForm();
    })
  }

  onDelete() {
     this._crud.createObject(this.form.value, 'task/delete').subscribe(res => {
      this.tasks = res;
      Swal.fire({
        icon: 'success',
        title: 'Tarea Borrada',
        text: 'Tarea Borrada en la Base de Datos',
      });
      this.clearForm();
    })
  }


  clearForm() {
    this.taskId = false;
    this.form.reset();
  }

  getDate(date) {
    var parts = date.split("/")
    return new Date(parts[2], parts[0]-1, parts[1]).toISOString().substring(0,10);
  }


}
