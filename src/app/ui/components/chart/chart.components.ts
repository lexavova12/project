
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartItem } from '../../model/ChartItem';

@Component({
  selector: 'chart',
  templateUrl: './chart.components.html',
  styleUrls: ['./chart.components.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input()
  chart : ChartItem;

  chartComponent: any;

  constructor() { }

  public ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
    const ctx = 'canvas';


    const dataObj = {
      labels: this.chart.labels,
      datasets: [{
        label: this.chart.header,
        data: this.chart.inputData,
        backgroundColor: this.chart.backgroundColor,
        borderColor: this.chart.borderColor,
        borderWidth: this.chart.borderWidth
      }]
    }

    if(!!this.chartComponent) {
      this.chartComponent.data = dataObj;
      this.chartComponent.update();
    } else {
      this.chartComponent = new Chart(ctx, {
          type: this.chart.type,
          data: dataObj,
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      }); 
    }
  }

}