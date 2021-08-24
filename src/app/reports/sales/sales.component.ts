import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ReportsService } from 'src/app/services/shared/reports.service';
import { ReportState } from 'src/app/store/reducers/report.reducers';

import * as ReportSelector from '../../store/selectors/report.selectors';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(
    public reportServcie: ReportsService,
    public store: Store<ReportState>) {

      this.store.pipe(select(ReportSelector.selectorReportState)).subscribe(res => {
        this.customers = [];
        console.log('VENTAS ES ', res.data);
        this.customers = res.data;
        console.log('CUSTOMERS ', this.customers);
        if(this.customers){
          this.initialSum();
          this.getSales(this.customers);
        }
        // console.log('CUSTOMERS ', this.customers.length);
        // this.getSum();

      })
    }

  customers:any[] =[];
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

  ngOnInit(): void {

    this.initialSum();
    this.reportServcie.getSalesByMonthByCustomer('').subscribe(res => {
      console.log('RES ', res);
      this.customers = res;
      this.getSales(this.customers);
    })


  }

  ngOnDestroy() {
    this.initialSum();
  }

  initialSum() {
    // let sumJaun = 0;

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

    console.log('this arr ', arr.length);
    for(let i = 0; i < this.customers.length; i++) {
      console.log('CUSTOMER ', this.customers[i]);

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
