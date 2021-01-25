import { Component, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Filter } from 'src/app/models/customer';
import { GetService } from 'src/app/services/get-service/get-service.service';
import { filterBy } from '../store/actions/facturas.actions';
import { customerState } from '../store/reducers/customers.reducer';
import { invoiceState } from '../store/reducers/facturas.reducer';
import * as customerSelector from '../store/selectors/customer.selectors';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  isFilter: boolean = false;
  isLoading: boolean = false;
  totalSales:number = 0;

  filter: Filter = {
    'iniDate': '',
    'finalDate': '',
    'serie': '',
    'iniFolio': '',
    'finalFolio': '',
    'company': '',
    'sucursal': '',
    'total': '',
    'total2': '',
    'pageNo': 0,
    'pageSize': '50',
    'sortBy': '',
    'orderBy': true

  }

  pages = [
    { id: 10, name: "10" },
    { id: 25, name: "25" },
    { id: 50, name: "50" },
    { id: 100, name: "100" },
  ];
  selectedValue: any = "25";

  filter$: Observable<any>;


  constructor(private store: Store<customerState>,
              private getService: GetService) { }

  ngOnInit(): void {

    this.filter$ = this.store.pipe(
      select(customerSelector.selectName)
    );
    console.log('SELECTOR ', this.filter$);
    this.getSales(this.filter);

  }

  setEventPageSize(event) {
    this.store.dispatch(filterBy({ filter: this.filter }));

  }

  addFilter(filter) {
    console.log('FILETER ', filter);
    this.isFilter = true;
    const filtered = this.filter;
    this.store.dispatch(filterBy({ filter: filtered }));
    this.getSales(this.filter);
  }

  quitarFiltro() {

    this.filter =
    {
      'iniDate': '',
      'finalDate': '',
      'serie': '',
      'iniFolio': '',
      'finalFolio': '',
      'company': '',
      'sucursal': '',
      'total': '',
      'total2': '',
      'pageNo': 0,
      'pageSize': '50',
      'sortBy': '',
      'orderBy': true

    };
    this.isFilter = false;
    this.store.dispatch(filterBy({ filter: this.filter }));
    this.getSales(this.filter);

  }

  getSales(filter){
    const stringQuery =  `iniDate=${filter.iniDate}&finalDate=${filter.finalDate}&company=${filter.company}&sucursal=${filter.sucursal}`

    this.getService.getSalesByDate('/report/get-sales-by-date',stringQuery).subscribe(res => {
      this.totalSales = res;
    })
  }

}
