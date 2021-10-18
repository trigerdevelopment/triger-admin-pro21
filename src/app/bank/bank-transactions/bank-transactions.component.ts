import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalBankTransService } from 'src/app/modals/modal-bank-trans/modal-bank-trans.service';
import { BankService } from 'src/app/services/bank.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ExpenseTypeService } from 'src/app/services/expense-type.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { BankMovCsvModalComponent } from '../../modals/bank-mov-csv-modal/bank-mov-csv-modal.component';
import { NgxModalService } from '../../services/shared/ngx-modal.service';
import { BankMovementsFormService } from '../bank-movements-form.service';
import { BankMovState } from '../store/reducers/bank.transactions.reducers';
import * as BankTransSelector from '../store/selectors/bank.trans.selectors';
import * as BankMovActions from '../store/actions/bank.transactions.actions';

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
 transactions:any[]= [];
 expenseType:any[];
 suppliers:any[];
 customers:any[];
 vm$: Observable<BankTransSelector.PaginatorBankTransSupport>;
 masterSelected:boolean;
 checkedList:any;

    constructor( public ngxModalService: NgxModalService,
    private router: Router,
    private bankService: BankService,
    private expenseTypeService: ExpenseTypeService,
    private customerService: CustomerService,
    private supplierService: SupplierService,
    private store: Store<BankMovState>,
    public modalService: ModalBankTransService,
    public bankFormService: BankMovementsFormService) { }

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(BankTransSelector.selectBankTransSupportModel));
     this.store.pipe(select(BankTransSelector.selectBankTransSupportModel)).subscribe(res => {
      this.transactions = res.pageable.content;
     });
    this.expenseTypeService.getExpenseType().subscribe(res => {
      this.expenseType = res;
    });

    this.customerService.getAllCustomer().subscribe(res => {
      this.customers=res;

    });

    this.supplierService.getAllSupplierByQuery('').subscribe(res => {
      this.suppliers=res.content;

    })

    this.bankService.refreshNeeded$.subscribe(() => {
      this.store.dispatch(BankMovActions.loadBankTransactionsByQuery({ query: ''}));

    });

    this.customers=[];
    this.suppliers=[];

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

      // this._formTaskService.editTask(user);


    }

    edit(obj: any) {
    this.bankFormService.filledForm(obj);
    this.modalService.mostrarModalBankTrans();

  }

    create() {
    this.modalService.mostrarModalBankTrans();

  }

  isAllSelected() {
    this.masterSelected = this.transactions.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  checkUncheckAll() {
    for (var i = 0; i < this.transactions.length; i++) {
      this.transactions[i].enabled = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.transactions.length; i++) {
      if(this.transactions[i].enabled)
      this.checkedList.push(this.transactions[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
    console.log('CHECKED LIST ', this.checkedList);

  }

  delete(obj: any){}



}
