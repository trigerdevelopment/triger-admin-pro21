import { Component, OnInit } from '@angular/core';
import { FormTaskService } from 'src/app/services/form-services/form-task.service';
import { FormUserService } from 'src/app/services/form-services/form-user.service';
import { ModalService } from 'src/app/services/shared/modal.service';
declare function init_plugins() : void;

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css']
})
export class ModalTaskComponent implements OnInit {

  public title: string = 'Registrar nueva Tarea';
  public titleEdit: string = 'Editar tarea';

  public categories: any[] = [];
  public subcategories: any[]= [];

  oculto:string = '';
  name:string='';
  text : string= '';
  select: boolean = false;
  selectedFile: File;
  currentFileUpload: File;
  progress: {percentage:number}= {percentage:0}
  type: string = '';

  constructor(public _modalService: ModalService,
              public _formTaskService: FormTaskService) { }

  ngOnInit(): void {
    init_plugins();
  }
}
