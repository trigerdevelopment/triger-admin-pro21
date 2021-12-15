import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QueryService } from 'src/app/customer/query.service';
import { InvoiceState } from 'src/app/customer/store/reducers/invoice.reducer';

import * as BankMovActions from '../store/actions/bank.transactions.actions';
import { BankMovState } from '../store/reducers/bank.transactions.reducers';

@Component({
  selector: 'app-bank-filter',
  templateUrl: './bank-filter.component.html',
  styleUrls: ['./bank-filter.component.css']
})
export class BankFilterComponent implements OnInit {
  query: string;
  isFilter: boolean = false;
  isLoading: boolean = false;
  totalSales: number = 0;
  volume:any=0;
  @Input() basecontroller: string='';
  @Input() filter1: any;

  vm$: Observable<any>;

  pages = [
    { id: 10, name: "10" },
    { id: 25, name: "25" },
    { id: 50, name: "50" },
    { id: 100, name: "100" },
  ];


  constructor(public queryService: QueryService,
    private store: Store<BankMovState>,
    // public filterService: FilterService
    ) { }

  ngOnInit(): void {

    /*-------------------------  LIMPIAMOS EL FILTRO Y SE DISPARA LA ACCION DE CARGAR LAS INVOICES  --------------------------------*/
    this.cleanFilter();
    // this.dispatchAction();


  }

  addFilter() {

    this.isFilter = true;
    this.setFilter();
    this.dispatchActionFilter();
  }

  quitarFiltro() {
    this.isFilter = false;
    this.cleanFilter();
    // this.dispatchAction();
    // this.store.dispatch(GraphActions.loadPieGraph());
    // this.store.dispatch(GraphActions.loadGraphics());

  }

  setEventPageSize(event) {

    this.queryService.filter3.pageSize = event.target.value;
    this.setFilter();

    this.dispatchAction();
  }



  cleanFilter() {
    this.isFilter = false;
    this.queryService.filter3 = {
      'initialDate': '',
      'finalDate': '',
      'cuenta': '',
      'referencia': '',
      'descripcion': '',
      'codTransac': '',
      'depositos': '',
      'retiros': '',
      'pageNo': 0,
      'pageSize': '',
      'sortBy': '',
      'orderBy': true

    }
    this.query = this.queryService.bankFilter(
      {
       initialDate: '',
       finalDate: '',
       cuenta: '',
       referencia: '',
       descripcion: '',
       codTransac: '',
       depositos: '',
       retiros: '',
       pageNo: null,
       pageSize: '',
       sortBy: '',
       orderBy: true,

      })

    this.dispatchAction();

  }

   setFilter(){

    this.query = this.queryService.bankFilter(
      {
       initialDate: this.queryService.filter3.initialDate,
       finalDate: this.queryService.filter3.finalDate,
       cuenta: this.queryService.filter3.cuenta,
       referencia: this.queryService.filter3.referencia,
       descripcion: this.queryService.filter3.descripcion,
       codTransac: this.queryService.filter3.codTransac,
       depositos: this.queryService.filter3.depositos,
       retiros: this.queryService.filter3.retiros,
       movimiento: this.queryService.filter3.movimiento,
       descripcionDetallada: this.queryService.filter3.descripcionDetallada,
       pageSize: this.queryService.filter3.pageSize,
       orderBy: true
       })


      //  this.store.dispatch(GraphActions.loadGraphByQuery({query:this.query}));
   }



   dispatchAction() {
     console.log('DISPATCH');
     this.store.dispatch(BankMovActions.loadBankTransactionsByQuery({ query: this.query}));
  }

   dispatchActionFilter() {
     console.log('DISPATCH');
    this.store.dispatch(BankMovActions.loadBankTransactionsByQuery({ query: this.query}));
  }

}
