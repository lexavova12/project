
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Task } from 'src/app/tasks/model/task';
import { TaskService } from 'src/app/tasks/services/task.service';
import { ChartItem } from 'src/app/ui/model/ChartItem';



@Component({
  selector: 'tasks-graph-layout',
  templateUrl: './tasks-graph.components.html',
  styleUrls: ['./tasks-graph.components.scss']
})
export class TasksGraphComponent implements OnInit {

    private tasks: Task[];

    public chart : ChartItem = {
        type: 'bar',
        header : "График задач по дням",
        backgroundColor : ['rgba(255, 99, 132, 0.2)'],
        borderColor:  ['rgba(255, 99, 132, 1)'],
        borderWidth: 1,
        inputData: [],
        labels : []
    };

    constructor(private tasksService: TaskService) { }

    public ngOnInit(): void {
        this.loadTasks();
    }

    private loadTasks() {
        this.tasksService.getAll().subscribe(data => {
            this.tasks = data;

            const currentMonth = moment(Date.now()).format('MM');
            const currentYear = moment(Date.now()).format('YY');
            const daysInMonth = new Date(parseInt(currentYear), parseInt(currentMonth), 0).getDate();
            let groupedTasks = this.tasks.filter(t => {
                if (!t.dateEnd) {
                    return false;
                }

                if (moment(t.dateEnd).format('MM') === currentMonth) {
                    return true
                } 

                return false;
            })


            let tChartLabels = [];
            let daysTasks = [];
            for (let i = 1; i <= daysInMonth; i++) {
                tChartLabels.push(i.toString());

                daysTasks[i-1] = daysTasks[i-1] !== undefined ? daysTasks[i-1] : 0;
                const findedTask = groupedTasks.filter(gt => parseInt(moment(gt.dateEnd).format('D')) === i);
                findedTask.forEach(ft => {
                    daysTasks[i-1] = daysTasks[i-1] + 1
                })
            }

            this.chart.inputData = daysTasks;
            this.chart.labels = tChartLabels;
        });
    }

}
