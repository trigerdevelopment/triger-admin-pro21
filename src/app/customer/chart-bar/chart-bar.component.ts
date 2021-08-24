import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Graph } from '../store/reducers/graph.reducer';

import * as GraphSelector from '../store/selectors/graph.selectors';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.css']
})
export class ChartBarComponent implements OnInit {
  volume:any = 0;

  constructor(private store: Store<Graph>) { }

  ngOnInit(): void {

    this.store.pipe(select(GraphSelector.selectGraphBarSupport)).subscribe(res => {
      console.log('GRAPH ', res.barGraph);

      // let result = res.barGraph.map(a => a.value);
      if(res.barGraph){
        let result = res.barGraph.map(r=> r.value);
        // console.log('RESULT ', result);

        this.graphicBar(res.barGraph.sort(function(a:any, b:any) {return a.name - b.name}));
      }
    })
  }


graphic(res:any){
this.barChartData = [{data: res}]
}

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun','Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Ventas por Mes' }
  ];


  graphicBar(res:any){



    let result = res.map(r=> r.name);
    let data = res.map(r=> r.value);

    switch(result) {

    }
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
