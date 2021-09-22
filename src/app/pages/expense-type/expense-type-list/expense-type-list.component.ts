import { Component, OnInit } from '@angular/core';
import { ModalExpenseTypeFileUploadComponent } from 'src/app/modals/modal-expense-type-file-upload/modal-expense-type-file-upload.component';
import { ModalExpenseTypeComponent } from 'src/app/modals/modal-expense-type/modal-expense-type.component';
import { FormExpenseTypeService } from 'src/app/services/form-services/form-expense-type.service';
import { ExpenseTypeService } from '../../../services/expense-type.service';
import { NgxModalService } from '../../../services/shared/ngx-modal.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-expense-type-list',
  templateUrl: './expense-type-list.component.html',
  styleUrls: ['./expense-type-list.component.css']
})
export class ExpenseTypeListComponent implements OnInit {

  expenseType:any[] = [];
  constructor(private expenseTypeService: ExpenseTypeService,
               private ngxModalService: NgxModalService,
               public formExpenseTypeService: FormExpenseTypeService) { }

  ngOnInit(): void {

    this.getList();

    this.expenseTypeService.refreshExpenseType$.subscribe(()=>{
      this.getList();
    })

  }

  deleteType(id:any):void {
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
        this.formExpenseTypeService.onDelete(id);
        Swal.fire(
          'Deleted!',
          'Your data  has been deleted.',
          'success'
        )
      }
    });
  }

  edit(obj:any):void {
    this.formExpenseTypeService.edit(obj)
    this.ngxModalService.show(ModalExpenseTypeComponent);

  }

  mostrarModal() {
    this.ngxModalService.show(ModalExpenseTypeFileUploadComponent);

  }

  showForm(){
    this.ngxModalService.show(ModalExpenseTypeComponent);
  }

  getList(){
    this.expenseTypeService.getExpenseType().subscribe(res => {
      this.expenseType = res;
    })
  }



}
