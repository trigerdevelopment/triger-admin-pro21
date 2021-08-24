import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QueryService } from 'src/app/customer/query.service';
import { ReportState } from 'src/app/store/reducers/report.reducers';

import * as ReportActions from '../../store/actions/report.actions';


@Component({
  selector: 'app-purchase-filter-report',
  templateUrl: './purchase-filter-report.component.html',
  styleUrls: ['./purchase-filter-report.component.css']
})
export class PurchaseFilterReportComponent implements OnInit {
  isLoading: boolean = false;
  @Input() totalSales=0;
  isFilter: boolean = false;
  // totalSales: number = 0;
  volume: number =0;
  years:any[]= [2019,2020,2021,2022]
  query: string='';

  constructor(
    public queryService: QueryService,
    private store: Store<ReportState>
    ) { }

  ngOnInit(): void {
  }

  addFilter(): void {}

 quitarFiltro() {
      this.isFilter = false;
      this.query = '';
  }

  selectYear(event){
    console.log('EVENT 0', event.target.value);
    this.query = '?date='.concat(event.target.value);
    console.log('QUERY ', this.query);
    this.dispatchAction();

  }

  dispatchAction() {

    this.store.dispatch(ReportActions.loadPurchaseByMonth({ query: this.query }));
  }
}
