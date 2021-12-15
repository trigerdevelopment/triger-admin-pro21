import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ReportsService } from 'src/app/services/shared/reports.service';
import { ReportState } from 'src/app/store/reducers/report.reducers';

import * as ReportSelector from '../../store/selectors/report.selectors';
import * as ExpensesSelector from '../../store/selectors/expenses.selectors';
import { ExpensesState } from 'src/app/store/reducers/expenses.reducers';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(
    public reportServcie: ReportsService,
    public store: Store<ReportState>,
    public storeExpenses: Store<ExpensesState>

    ) {

      this.store.pipe(select(ReportSelector.selectorReportState)).subscribe(res => {
        this.customers = [];
        this.customers = res.data;
        if(this.customers){
          this.initialSum();
          this.getSales(this.customers);
        }

      })

      this.store.pipe(select(ExpensesSelector.selectorExpensesState)).subscribe(res => {
        if(res){
          this.totalCosts = res.data;
        }

      })
    }

  customers:any[] =[];
  ceroValue=0;
  newCustomers :any[] = [];
  sumJaun:number=0;
  sumFeb:number=0;
  sumMar:number=0;
  sumApr:number=0;
  sumMay:number=0;
  sumJun:number=0;
  sumJul:number=0;
  sumAug:number=0;
  sumSep:number=0;
  sumOct:number=0;
  sumNov:number=0;
  sumDic:number=0;
  totalSales:number=0;
  totalCosts:any;

  ngOnInit(): void {

    this.initialSum();
    this.reportServcie.getSalesByMonthByCustomer('').subscribe(res => {
      this.customers = res;
      this.getSales(this.customers);
    });

    this.reportServcie.getSalesCostByMonth('').subscribe(res => {
      this.totalCosts = res;
    })
  }

  ngOnDestroy() {
    this.initialSum();
  }

  initialSum() {

      this.sumJaun =0;
      this.sumFeb =0;
      this.sumMar =0;
      this.sumApr =0;
      this.sumMay =0;
      this.sumJun =0;
      this.sumJul =0;
      this.sumAug =0;
      this.sumSep =0;
      this.sumOct =0;
      this.sumNov =0;
      this.sumDic =0;
      this.totalSales=0;


  }

  getSales(arr: any[]) {

    for(let i = 0; i < this.customers.length; i++) {

      this.sumJaun += this.customers[i].january;
      this.sumFeb += this.customers[i].february;
      this.sumMar += this.customers[i].march;
      this.sumApr += this.customers[i].april;
      this.sumMay += this.customers[i].may;
      this.sumJun += this.customers[i].june;
      this.sumJul += this.customers[i].july;
      this.sumAug += this.customers[i].august;
      this.sumSep += this.customers[i].september;
      this.sumOct += this.customers[i].october;
      this.sumNov += this.customers[i].november;
      this.sumDic += this.customers[i].december;
    }

    this.totalSales = this.sumJaun + this.sumFeb+ this.sumMar + this.sumApr
                      this.sumMay+this.sumJun+this.sumJul+this.sumAug+this.sumSep
                      this.sumOct+this.sumNov+this.sumDic;
  }

}
