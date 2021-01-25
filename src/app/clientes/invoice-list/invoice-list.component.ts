import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
// import  paginate from 'jw-paginate';
import { AppState } from 'src/app/app.reducers';
import { Invoice, Pageable } from 'src/app/models/customer';
import { cargarInvoices } from '../store/actions/facturas.actions';
import { CustomerState } from '../store/customer.reducer.index';
import { invoiceReducer, invoiceState } from '../store/reducers/facturas.reducer';

// import  paginate from 'jw-paginate';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit, OnChanges {
  p: number = 1;
  invoices:Invoice[];
  pageable:Pageable;
  pageOfItems: Array<any>;


  constructor(private store : Store<CustomerState>) {


  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  functionOrderBy(fecha){}

  mostrarPaymentModal(){}
  mostrarMultipleModal(){}

  ngOnInit(): void {



    console.log('PASAMOS POR AQUI');

    this.store.select('customer').subscribe(invo=> {
      console.log(invo);

      if(invo.invoices){
         console.log('INVOICES ',invo.invoices);
         this.invoices = invo.invoices['content'];
        this.pageable = invo.invoices;
      }


    });
    this.store.dispatch(cargarInvoices());

  }



}
