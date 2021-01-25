import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { Filter } from 'src/app/models/customer';
import { GetService } from 'src/app/services/get-service/get-service.service';
import { filterBy } from '../store/actions/facturas.actions';
import { invoiceState } from '../store/reducers/facturas.reducer';
import * as facturasSelector from '../store/selectors/facturas.selectors';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { TestRangesService } from 'src/app/services/test-ranges.service';


@Component({
  selector: 'app-filter-sales-report',
  templateUrl: './filter-sales-report.component.html',
  styleUrls: ['./filter-sales-report.component.css']
})
export class FilterSalesReportComponent implements OnInit {
  // colorTheme = 'theme-dark-blue';
  isFilter: boolean = false;
  isLoading: boolean = false;
  totalSales:number = 0;
  bsConfig: Partial<BsDatepickerConfig>;
// setOptions():void {
//   this.bsConfig = Object.assign({}, { isAnimated: true,containerClass:this.colorTheme })

//   setTimeout(() => {
//     // this.datepicker.toggle();
//   });
// }

  filter: any = {
    'iniDate': null,
    'finalDate':null,
    'company': '',
    'sucursal': '',
    'report': 'byMonth',

  }

  pages = [
    { id: 10, name: "10" },
    { id: 25, name: "25" },
    { id: 50, name: "50" },
    { id: 100, name: "100" },
  ];
  selectedValue: any = "25";

  filter$: Observable<any>;
  locale = 'en';


  constructor(private store: Store<invoiceState>,
              private getService: GetService,
              private localeService: BsLocaleService,
              public testRangeServcie: TestRangesService) {
                defineLocale('es', esLocale);
                localeService.use('es');

  }

  ngOnInit(): void {
    // defineLocale('es', esLocale);
    // this.localeService.use(this.locale);
    this.filter$ = this.store.pipe(
      select(facturasSelector.selectName)
    );
    console.log('SELECTOR ', this.filter$);
    // this.getSales(this.filter);

  }

  setEventPageSize(event) {
    this.store.dispatch(filterBy({ filter: this.filter }));

  }

  addFilter(filter) {
    console.log('FILETER ', filter);
    const pattern = "YYYY-MM-DD";
 console.log('INI DATE ', this.filter.iniDate.getTime());
    const Difference_In_Time = this.filter.finalDate.getTime()-this.filter.iniDate.getTime();

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    console.log('DIFERENCIA DE DIAS ', Difference_In_Days);


    console.log(' DIFERENCIA DE FECHAS ', this.filter.finalDate - this.filter.iniDate);

    switch(this.filter.report) {
      case 'byMonth':
        // code block
        console.log('BY MONTH');
        if(Difference_In_Days > 365){
          console.log('ERROR !!! IN BY MONTH');

        }

        break;
      case 'byWeek':
        // code block
        console.log('BY WEEK ');
        if(Difference_In_Days > 96)
        console.log('ERROR !!!');


        break;
      case 'byDay':
        // code block
        console.log('BY DAY');
        if(Difference_In_Days > 31) {
          console.log('ERR0R !!!!');

        }

        break;
      default:
        // code block
    }



     const initialDate = this.formatDate(this.filter.iniDate);

    this.filter.iniDate.toString();
    console.log('INI DATE ', this.filter.iniDate.toString);

    // this.isFilter = true;
    // const filtered = this.filter;
    // this.store.dispatch(filterBy({ filter: filtered }));
    // this.getSales(this.filter);
    const stringQuery =  `iniDate=${initialDate}&finalDate=${filter.finalDate}&company=${filter.company}&sucursal=${filter.sucursal}`

    this.getService.getSalesByDate('/test/get-sales-by-query',stringQuery).subscribe(res => {

    })
  }

  quitarFiltro() {

    this.filter =
    {
      'iniDate': null,
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


  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}



}
