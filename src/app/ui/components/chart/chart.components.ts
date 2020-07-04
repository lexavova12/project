
import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartItem } from '../../model/ChartItem';

@Component({
  selector: 'chart',
  templateUrl: './chart.components.html',
  styleUrls: ['./chart.components.scss']
})
export class ChartComponent implements OnInit {

  @Input()
  chart : ChartItem;

  constructor() { }

  public ngOnInit(): void { 
    const ctx = 'canvas';

    const myChart = new Chart(ctx, {
        type: this.chart.type,
        data: {
            labels: this.chart.labels,
            datasets: [{
              label: this.chart.header,
              data: this.chart.inputData,
              backgroundColor: this.chart.backgroundColor,
              borderColor: this.chart.borderColor,
              borderWidth: this.chart.borderWidth
            }]
        },
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