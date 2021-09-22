import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BankService } from 'src/app/services/bank.service';
import { ExpenseTypeService } from 'src/app/services/expense-type.service';
import { BankMovCsvModalComponent } from '../../modals/bank-mov-csv-modal/bank-mov-csv-modal.component';
import { NgxModalService } from '../../services/shared/ngx-modal.service';
import { BankMovState } from '../store/reducers/bank.transactions.reducers';
import * as BankTransSelector from '../store/selectors/bank.trans.selectors';


@Component({
  selector: 'app-bank-transactions',
  templateUrl: './bank-transactions.component.html',
  styleUrls: ['./bank-transactions.component.css']
})
export class BankTransactionsComponent implements OnInit {

 @Input()  basecontroller:any;
 @Input() url:any;
 sortBy;
 orderBy;
 movs:any[]= [];
 expenseType:any[];
 vm$: Observable<BankTransSelector.PaginatorBankTransSupport>;


    constructor( public ngxModalService: NgxModalService,
    private router: Router,
    private bankService: BankService,
    private expenseTypeService: ExpenseTypeService,
    private store: Store<BankMovState>) { }

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(BankTransSelector.selectBankTransSupportModel));
    this.expenseTypeService.getExpenseType().subscribe(res => {
      this.expenseType = res;
    })

  }

  typeOfCost(obj:any) {
console.log('MOVEMENT ', obj);
this.bankService.updateBankMovement(JSON.stringify(obj)).subscribe(res => {
  console.log('RES ', res);

})


  }

  mostrarMultipleModal(){
    this.ngxModalService.show(BankMovCsvModalComponent);

  }

  showInvoiceFormModal(){

  }

  functionSortBy(sortBy: string){

  }

  detail(obj: any){
    this.router.navigate(['bank/bank-movements-edit', obj.id]);
  }

  delete(obj: any){}

}
