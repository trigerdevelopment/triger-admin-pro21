import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormTaskService } from 'src/app/services/form-services/form-task.service';
import { CrudService } from 'src/app/services/shared/crud.service';
import { ModalService } from 'src/app/services/shared/modal.service';
declare function init_plugins(): void;



@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.css']
})
export class FormTaskComponent implements OnInit {

  isspinner: boolean = false;
  constructor(
    public _formUser: FormTaskService,
    public _formBuilder: FormBuilder,
    public _crud: CrudService,
    public _modalService: ModalService
  ) { }

  ngOnInit(): void {
    init_plugins();

  }

}
