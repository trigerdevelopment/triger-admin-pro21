import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/shared/reports.service';

@Component({
  selector: 'app-income-statements',
  templateUrl: './income-statements.component.html',
  styleUrls: ['./income-statements.component.css']
})
export class IncomeStatementsComponent implements OnInit {

  constructor(public reportService: ReportsService) { }

  // ngOnInit(): void {

  //   this.reportService.getIncomeStatements('').subscribe(res => {
  //       console.log('GASTOS POR MES ', res);

  //   })
  // }

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
    this.reportService.getIncomeStatements('').subscribe(res => {
      this.customers = res;
      this.getSales(this.customers);
    });

    this.reportService.getSalesCostByMonth('').subscribe(res => {
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
