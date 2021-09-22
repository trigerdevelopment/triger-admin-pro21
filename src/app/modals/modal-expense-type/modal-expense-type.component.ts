import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseTypeService } from 'src/app/services/expense-type.service';
import { FormExpenseTypeService } from 'src/app/services/form-services/form-expense-type.service';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';
import { SpinnerService } from 'src/app/services/spiner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-expense-type',
  templateUrl: './modal-expense-type.component.html',
  styleUrls: ['./modal-expense-type.component.css']
})
export class ModalExpenseTypeComponent implements OnInit {

  form: FormGroup;
  isspinner: boolean = false;
  types: any[];

  constructor(private f: FormBuilder,
    public spinnerService: SpinnerService,
    // private customerService: CustomerService,
    public formService: FormExpenseTypeService,
    private expenseTypeService: ExpenseTypeService,
    private ngxModalService: NgxModalService,
  ) { }

  ngOnInit() {


    this.form = this.f.group({
      id: [''],
      expense: ['', Validators.required],

    });


  }

  onSubmit() {

   this.spinnerService.show();

      this.expenseTypeService.createType(this.form.value).subscribe(res => {

      })
      this.spinnerService.hide();
        this.form.reset();
        Swal.fire({
          icon: 'success',
          title: 'Nueva Categoria',
          text: 'La Categoria se agrego en la Base de Datos',
        });
    }

  closeModal() {
    this.formService.cleanForm();
    this.ngxModalService.hide()

  }



}
