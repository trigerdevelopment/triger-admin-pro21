import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as InvoiceActions from 'src/app/customer/store/actions/invoice.actions';
import { InvoiceState } from 'src/app/customer/store/reducers/invoice.reducer';
import { FormInvoiceService } from 'src/app/services/form-services/form-invoice.service';
import * as CustomerSelector from '../../customer/store/selectors/customer.selectors';
import * as ProductsSelector from '../../customer/store/selectors/product.selectors';
import * as CustomerActions from '../../customer/store/actions/customer.actions';
import * as ProductsActions from '../../customer/store/actions/products.actions';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit, OnDestroy{
  vm$: Observable<CustomerSelector.CustomerSupport>;
  pm$: Observable<ProductsSelector.ProductSupport>;
  url:string ='/customer/get-all-customer';
  query:string ='';


  constructor(public _form: FormInvoiceService,
              private store: Store<InvoiceState>
              // public _produccion: ProduccionService
    ) { }

  ngOnInit(): void {
    // this.store.dispatch(InvoiceActions.addInvoice({url:this.url}));
    this.store.dispatch(CustomerActions.loadCustomer());
    this.store.dispatch(ProductsActions.loadProducts({query:this.query}));
    this.vm$ = this.store.pipe(select(CustomerSelector.selectCustomerSupportModel));
    this.pm$ = this.store.pipe(select(ProductsSelector.selectProductSupportModel))
  }


  addCustomer(){
    console.log('ADD CUSTOMER ');
  }

  ngOnDestroy() {
    console.log('Items destroyed');
    this._form.cleanForm();
  }
}
