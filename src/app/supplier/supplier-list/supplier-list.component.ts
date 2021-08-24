import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QueryService } from 'src/app/customer/query.service';

 /**********NGRX***************** */
 import * as SupplierSelector from '../../supplier/store/selectors/supplier.selector';
import { SupplierInvoiceState } from '../store/reducers/supplier-invoice.reducer';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  query: string;
  orderBy: boolean = true;
  sortBy: string = '';
  url:string ="supplier/supplier-list"
  vm$: Observable<SupplierSelector.SupplierSupport>;
  basecontroller = '/supplier/supplier-by-query?';


  constructor(
    private store: Store<SupplierInvoiceState>,
    private router: Router,
    private queryService: QueryService,


  ) { }

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(SupplierSelector.selectSupplierSupportModel))
  }

  functionSortBy(sortBy: string) {

    this.orderBy = !this.orderBy;
    this.sortBy = sortBy;

    this.query = this.queryService.createFilterUrl(
      {iniDate: '',
       finalDate: '',
       iniFolio: 0,
       finalFolio: '',
       company:'',
       sucursal:'',
       total:null,
       total2:null,
       pageNo:null,
       pageSize:null,
       sortBy:this.sortBy,
       orderBy:this.orderBy,

         })

      // this.store.dispatch(InvoiceActions.loadInvoices({ query: this.query }))

  }

  verDetalle(supplier){
    console.log('CUSTOMER ', supplier);
    this.router.navigate(['supplier/supplier-details', supplier.id]);

  }

  editCustomer(supplier){
    // this.store.dispatch(CustomerActions.loadCustomerById({id: customer.id}));
    this.router.navigate(['supplier/supplier-edit', supplier.id]);
  }

}
