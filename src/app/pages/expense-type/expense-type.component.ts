import { Component, OnInit } from '@angular/core';
import { ModalExpenseTypeFileUploadComponent } from 'src/app/modals/modal-expense-type-file-upload/modal-expense-type-file-upload.component';
import { ModalExpenseTypeComponent } from 'src/app/modals/modal-expense-type/modal-expense-type.component';
import { BankService } from 'src/app/services/bank.service';
import { ExpenseTypeService } from 'src/app/services/expense-type.service';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';

@Component({
  selector: 'app-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: ['./expense-type.component.css']
})
export class ExpenseTypeComponent implements OnInit {

  expenseType:any[] = [];
  constructor(private expenseTypeService: ExpenseTypeService,
               private ngxModalService: NgxModalService) { }

  ngOnInit(): void {

  }

  deleteType(obj:any):void {

  }

  mostrarModal() {
    this.ngxModalService.show(ModalExpenseTypeFileUploadComponent);

  }

  showForm(){
    this.ngxModalService.show(ModalExpenseTypeComponent);
  }


}
