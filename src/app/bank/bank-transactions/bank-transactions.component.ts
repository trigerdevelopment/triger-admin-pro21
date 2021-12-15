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
import { NgxModalService } from '../../services/shared/ngx-modal.service';
import { BankMovementsFormService } from '../bank-movements-form.service';
import { BankMovState } from '../store/reducers/bank.transactions.reducers';
import * as BankTransSelector from '../store/selectors/bank.trans.selectors';
import * as BankMovActions from '../store/actions/bank.transactions.actions';
import Swal from 'sweetalert2';
import { ModalBankMovExcelComponent } from 'src/app/bank/modal-bank-mov-excel/modal-bank-mov-excel.component';
import { UploadService } from 'src/app/services/shared/upload.service';


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
    public bankFormService: BankMovementsFormService,
    public _uploadService: UploadService) { }

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
    this.ngxModalService.show(ModalBankMovExcelComponent);

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

  }

  deleteList(){

    if(this.checkedList){
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
          this.bankService.deleteBankingTransactionList(this.checkedList).subscribe(res => {
            this.checkUncheckAll();
            this.dispatchAction();
          })
          this.masterSelected = false;
          this.checkedList == null;
          Swal.fire(
            'Deleted!',
            'Your data  has been deleted.',
            'success'
          )
        }
        this.checkedList=[] ;
      });
    }else{
      console.log('NO CHECKED ', this.checkedList);
        ;
    }
  }

  subirArchivoExcel(){
      // this._modalService.mostrarMultipleFileUploadModal(this.idModal, this.URL_CUSTOMER);
      // this.ngxModalService.show();

  }

  dispatchAction() {
    console.log('DISPATCH');
    this.store.dispatch(BankMovActions.loadBankTransactionsByQuery({ query: ''}));
 }


}
