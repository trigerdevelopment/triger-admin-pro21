import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';

@Component({
  selector: 'app-invoice-form-modal',
  templateUrl: './invoice-form-modal.component.html',
  styleUrls: ['./invoice-form-modal.component.css']
})
export class InvoiceFormModalComponent implements OnInit {


  constructor(private formBuilder: FormBuilder,
              private ngxModalService: NgxModalService,
              ) { }

  ngOnInit() {

  }

  cerrarModal(){
    this.ngxModalService.hide();
  }

}
