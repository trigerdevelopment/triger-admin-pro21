import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from '../spiner.service';
import   Swal from 'sweetalert2'
import { ExpenseTypeService } from '../expense-type.service';
@Injectable({
  providedIn: 'root'
})
export class FormExpenseTypeService {

  constructor( public _formBuilder: FormBuilder,
              public spinnerService: SpinnerService,
              public expenseTypeService: ExpenseTypeService) { }

  form:FormGroup = this._formBuilder.group({
    id: [''],
    expense: ['', Validators.required],

  });

  edit(obj: any) {

    this.form.get('id')!.setValue(obj.id);
    this.form.get('expense')!.setValue(obj.expense);
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

  cleanForm(){
    this.form.reset();
  }

  onDelete(id: any): void{
    this.expenseTypeService.deleteExpenseType(id).subscribe(res => {
     this.form.reset();
   })
 }

}
