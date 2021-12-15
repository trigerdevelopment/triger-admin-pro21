import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReportsService } from '../../services/shared/reports.service';
import { GastosState } from '../store/reducers/gastos.reducers';
import * as GastosSelector from '../store/selectors/gastos.selectors';
import * as SalesSelector from '../store/selectors/sales.selectors';
import * as CostsSelector from '../store/selectors/costs.selectors';

@Component({
  selector: 'app-income-statements',
  templateUrl: './income-statements.component.html',
  styleUrls: ['./income-statements.component.css']
})
export class IncomeStatementsComponent implements OnInit {

  vm$: Observable<GastosSelector.GastosSupport>;
  svm$: Observable<SalesSelector.SalesSupport>;
  cvm$: Observable<CostsSelector.CostsSupport>;

  constructor(
    public reportService: ReportsService,
    private store: Store<GastosState>
    ) { }

  customers:any[] =[];
  sales:any;
  costs:any;

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

  sum1Jaun:number=0;
  sum1Feb:number=0;
  sum1Mar:number=0;
  sum1Apr:number=0;
  sum1May:number=0;
  sum1Jun:number=0;
  sum1Jul:number=0;
  sum1Aug:number=0;
  sum1Sep:number=0;
  sum1Oct:number=0;
  sum1Nov:number=0;
  sum1Dic:number=0;
  totalSales:number=0;
  totalExpenses:number=0;
  totalCosts:any;
  expenses:any[]=[]

  ngOnInit(): void {

    this.initialSum();

    this.vm$ = this.store.pipe(select(GastosSelector.selectGastosSelectorModel));
    this.svm$ = this.store.pipe(select(SalesSelector.selectSalesSelectorModel));
    // this.cvm$ = this.store.pipe(select(CostsSelector.selectCostsSelectorModel));
    this.store.pipe(select(CostsSelector.selectCostsSelectorModel)).subscribe(res=>{
      if(res){
        this.costs = res.data;
      }
    });

    console.log('VM ', this.vm$.subscribe(res => {
      console.log(' RESULT ', res.data);
      this.expenses = res.data;
      if(this.expenses){
        this.getExpenses();
      }
    }));

    this.svm$.subscribe(res => {
        this.sales = res.data;
        console.log('SALES ', this.sales);


    })

    this.reportService.getSalesByMonth('').subscribe(res => {
      console.log('SALES' , res);
      this.sales = res;

    })

    // this.reportService.getIncomeStatements('').subscribe(res => {
    //   this.customers = res;
    //   this.getSales(this.customers);
    // });

    this.reportService.getSalesCostByMonth('').subscribe(res => {
      this.totalCosts = res;
    })

    // this.reportService.getExpenseByMonth('').subscribe(res => {
    //   this.expenses = res;
    // })


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

      this.sum1Jaun =0;
      this.sum1Feb =0;
      this.sum1Mar =0;
      this.sum1Apr =0;
      this.sum1May =0;
      this.sum1Jun =0;
      this.sum1Jul =0;
      this.sum1Aug =0;
      this.sum1Sep =0;
      this.sum1Oct =0;
      this.sum1Nov =0;
      this.sum1Dic =0;
      this.totalExpenses=0;


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


  getExpenses() {
   this.initialSum();

  for(let i = 0; i < this.expenses.length; i++) {

    this.sum1Jaun += this.expenses[i].january;
    this.sum1Feb += this.expenses[i].february;
    this.sum1Mar += this.expenses[i].march;
    this.sum1Apr += this.expenses[i].april;
    this.sum1May += this.expenses[i].may;
    this.sum1Jun += this.expenses[i].june;
    this.sum1Jul += this.expenses[i].july;
    this.sum1Aug += this.expenses[i].august;
    this.sum1Sep += this.expenses[i].september;
    this.sum1Oct += this.expenses[i].october;
    this.sum1Nov += this.expenses[i].november;
    this.sum1Dic += this.expenses[i].december;
}

      this.totalExpenses =   this.sum1Jaun + this.sum1Feb
                              + this.sum1Mar + this.sum1Apr +
                                this.sum1May + this.sum1Jun + this.sum1Jul
                                  + this.sum1Aug+this.sum1Sep +
                                      this.sum1Oct + this.sum1Nov + this.sum1Dic;

  }


}
