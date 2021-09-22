import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QueryService } from 'src/app/customer/query.service';
import { ReportState } from 'src/app/store/reducers/report.reducers';

import * as ReportActions from '../../store/actions/report.actions';
import * as ExpensesActions from '../../store/actions/expenses.actions';

@Component({
  selector: 'app-filter-report',
  templateUrl: './filter-report.component.html',
  styleUrls: ['./filter-report.component.css']
})
export class FilterReportComponent implements OnInit {

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
    this.query = '?date='.concat(event.target.value);
    this.dispatchAction();

  }

  dispatchAction() {

    this.store.dispatch(ReportActions.loadSalesByMonth({ query: this.query }));
    this.store.dispatch(ExpensesActions.loadExpensesByMonth({ query: this.query }));
  }
}
