import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { Graph } from '../store/reducers/graph.reducer';
import * as GraphSelector from '../store/selectors/graph.selectors';
import * as GraphActions from '../store/actions/graph.actions';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})
export class ChartPieComponent implements OnInit {

  volume:any = 0;

  constructor(private store: Store<Graph>) { }

  ngOnInit(): void {

    this.store.pipe(select(GraphSelector.selectInvoiceSupportModel))
    .subscribe(res =>{
       if (res.graph) {
        //  this.setGraphic(res.graph);
        // console.log('PIE GRAPH ', res.graph);
          // let result = res.graph.map(r=> r.name);
          // console.log('RESULT ', result);
        console.log('Graphic ', res.graph);

         this.graphic(res.graph);
      }
     })

    //  this.store.dispatch(GraphActions.loadPieGraph());
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ["Ene", 'Feb', 'Mar', 'Abr', 'May', 'Jun','Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Ventas por Mes' }
  ];



  graphic(res:any){



    let result = res.map(r=> r.name);
    let data = res.map(r=> r.value);
    // console.log('LABELS ',data);

    this.barChartLabels = [...result];
    this.barChartData = [{data: data,  backgroundColor: [
      'rgba(255, 99, 132, 0.4)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
  ], barPercentage: 0.5,
  borderColor: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
],  borderWidth: 1

}]

this.sumVolume([...data]);
  }

  sumVolume(data:any[]){
this.volume = 0;
    for(let i = 0; i < data.length; i++) {
      this.volume = this.volume + data[i];
    }

    // console.log('VOLUME ', this.volume);

  }

}

