import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { customerFilter} from 'src/app/models/customer';
import { environment } from 'src/environments/environment';
import { QueryService } from '../../query.service';


import { InvoiceState } from '../../store/reducers/invoice.reducer';
import * as CustomerActions from '../../store/actions/customer.actions';
import * as InvoiceSelector from '../../store/selectors/invoice.selectors';
import * as InvoiceActions from '../../store/actions/invoice.actions';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.css']
})
export class CustomerFilterComponent implements OnInit {

  query: string;
  isFilter: boolean = false;
  isLoading: boolean = false;
  totalSales: number = 0;
  volume:any=0;
  // vm$: Observable<InvoiceSelector.PaginatorSupport>;
  @Input() basecontroller:string;
  @Input() filter1: any;


  pages = [
    { id: 10, name: "10" },
    { id: 25, name: "25" },
    { id: 50, name: "50" },
    { id: 100, name: "100" },
  ];

  // filter: customerFilter = {
  //   'company': '',
  //   'sucursal': '',
  //   'rfc':'',
  //   'categoria':'',
  //   'total': '',
  //   'pageNo': 0,
  //   'pageSize': '',
  //   'sortBy': '',
  //   'orderBy': true

  // }

  constructor(
    public queryService: QueryService,
    private store: Store<InvoiceState>,
    // public filterService: FilterService
    ) { }

  ngOnInit(): void {
    this.cleanFilter();
   }

  addFilter() {

    this.isFilter = true;
    this.setFilter();
    this.dispatchAction();
  }

  quitarFiltro() {
    this.isFilter = false;
    this.cleanFilter();

  }

  setEventPageSize(event) {

    this.queryService.filter1.pageSize = event.target.value;
    this.setFilter();
    this.dispatchAction();
  }



  cleanFilter() {
    this.isFilter = false;
    this.queryService.filter1 = {
      'iniDate': '',
      'finalDate': '',
      'serie': '',
      'rfc': '',
      'categoria': '',
      'folio': '',
      'finalFolio': '',
      'company': '',
      'sucursal': '',
      'total': '',
      'total2': '',
      'pageNo': 0,
      'pageSize': '',
      'sortBy': '',
      'orderBy': true

    }
    this.query = this.queryService.customerFilter(
      {
       company: '',
       sucursal: '',
       categoria:'',
       total: '',
       pageNo: null,
       pageSize: '',
       sortBy: '',
       orderBy: true
      });

    this.dispatchAction();

  }

   setFilter(){

    this.query = this.queryService.customerFilter(
      {
       company: this.queryService.filter1.company,
       sucursal: this.queryService.filter1.sucursal,
       rfc: this.queryService.filter1.rfc,
       categoria:this.queryService.filter1.categoria,
       pageSize: this.queryService.filter1.pageSize,
       orderBy: true
   })
   }

   dispatchAction() {
   this.store.dispatch(CustomerActions.loadCustomerByQuery({ query: this.query }));
  }
}
