import { Component, OnInit } from '@angular/core';
import { BankMovementsFormService } from 'src/app/bank/bank-movements-form.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ExpenseTypeService } from 'src/app/services/expense-type.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-form-bank-trans',
  templateUrl: './form-bank-trans.component.html',
  styleUrls: ['./form-bank-trans.component.css']
})
export class FormBankTransComponent implements OnInit {

  expenseType:any[];
  suppliers: any[];
  customers: any[];

  constructor(public form: BankMovementsFormService,
    public expenseTypeService: ExpenseTypeService,
    public supplierService:SupplierService,
    public customerService: CustomerService,) { }

  ngOnInit(): void {

    this.expenseTypeService.getExpenseType().subscribe(res => {
      this.expenseType = res;
    });

    this.supplierService.getAllSupplierByQuery('').subscribe(res => {
      this.suppliers=res.content;
    });

    this.customerService.getAllCustomerByQuery('').subscribe(res => {
      this.customers = res.content;
    })


  }
}
