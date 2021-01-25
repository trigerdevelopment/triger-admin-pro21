import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { GetService } from 'src/app/services/get-service/get-service.service';

@Component({
  selector: 'app-sales-by-month',
  templateUrl: './sales-by-month.component.html',
  styleUrls: ['./sales-by-month.component.css']
})
export class SalesByMonthComponent implements OnInit {

  isLoading:boolean=false;
  iniDate: String = "";
  finalDate: String = "";
  urlSalesByDate: string = "/report/get-sales-by-month";

  lineChartData: ChartDataSets[] = [
    // { data: [this.totalSalesJaunary,this.totalSalesFeubaray,this.totalSalesMarch], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  lineChartOptions = {
    responsive: true,
    scales: { xAxes: [{ ticks: {
      max: 5,
      min: 0,
      stepSize: 0.5
  }}], yAxes: [{ ticks: {
    max: 300000,
    min: 0,
    stepSize: 20000
}}] },
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'rgba(56, 117, 188,1)',
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderWidth:1
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'bar';


  constructor(public _getSalesByMonth: GetService) { }

  ngOnInit(): void {

    // this.getSalesByDate();
  }

    /*----------------------- Se piden datos al servidor para llenar la grafica---------------------- */

    getSalesByDate(){
      const stringQuery = `iniDate=${this.iniDate}&finalDate=${this.finalDate}`;
      this._getSalesByMonth.getSalesByDate(this.urlSalesByDate,stringQuery).subscribe(res=> {

        console.log('RES ', res);
        this.lineChartData = [
        {data: [res.Enero, res.Febrero, res.Marzo, res.Abril]}
        ];
      })

      this.isLoading=false;

    }


}
