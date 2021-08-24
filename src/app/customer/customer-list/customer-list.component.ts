import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { QueryService } from '../query.service';

import * as InvoiceSelector from '../store/selectors/invoice.selectors';

/*-------------------NGRX -------------------------------*/
import * as CustomerSelector from '../store/selectors/customer.selectors';
import * as CustomerActions from '../store/actions/customer.actions';
import { CustomerState } from '../store/reducers/customer.reducers';
import * as InvoiceActions from '../store/actions/invoice.actions';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  query: string;
  orderBy: boolean = true;
  sortBy: string = '';
  vm$: Observable<CustomerSelector.CustomerSupportPageable>;
  url: string = '/customer/customer-by-query?';
  basecontroller = '/customer/customer-by-query?';


  constructor(
    private store: Store<CustomerState>,
    private router: Router,
    private queryService: QueryService,


  ) { }

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(CustomerSelector.selectCustomerSupportModelByPage))
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

      this.store.dispatch(InvoiceActions.loadInvoices({ query: this.query }))

  }

  verDetalle(customer){
    console.log('CUSTOMER ', customer);
    this.router.navigate(['customer/customer-details', customer.id]);

  }

  editCustomer(customer){
    this.store.dispatch(CustomerActions.loadCustomerById({id: customer.id}));
    this.router.navigate(['customer/customer-edit', customer.id]);
  }

}
