
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

import { Task } from 'src/app/tasks/model/task';
import { TaskService } from 'src/app/tasks/services/task.service';
import { ChartItem } from 'src/app/ui/model/ChartItem';
import { SelectItem } from 'src/app/ui/model/SelectItem';
import { DropDownComponent } from 'src/app/ui/components/dropdown/dropdown.components';



@Component({
  selector: 'tasks-graph-layout',
  templateUrl: './tasks-graph.components.html',
  styleUrls: ['./tasks-graph.components.scss']
})
export class TasksGraphComponent implements OnInit {

    private tasks: Task[];

    public allYears: SelectItem[] = [];
    public allMonths: SelectItem[] = [];

    public selectedYear: string;
    public selectedMonth: string;

    public chart: ChartItem;

    @ViewChild("dropdownYear") ddYear : DropDownComponent;
    @ViewChild("dropdownMonth") ddMonth : DropDownComponent;
    

    constructor(private tasksService: TaskService) { }

    public ngOnInit(): void {
        this.loadYears();
        this.loadMonths();
        this.loadTasks();
    }

    // Fill years from current to current-50
    private loadYears() {
        const currentYear = parseInt(this.getCurrentYear());

        for (let i = currentYear; i > currentYear - 50; i--) {
            this.allYears.push(new SelectItem(i.toString(), i));
        }

        this.selectedYear = this.getCurrentYear();
    }

    // Fill all months
    private loadMonths() {

        this.allMonths = Array.from({length: 12}, (e, i) => {
            const month = new Date(null, i + 1, null).toLocaleDateString("ru", {month: "long"});
            return new SelectItem(month, i + 1);
        })

        this.selectedMonth = moment(Date.now()).format('M');
    }

    private loadTasks() {
        this.tasksService.getAll().subscribe(data => {
            this.tasks = data;

            const daysInMonth = new Date(parseInt(this.ddYear.selectedValue), parseInt(this.ddMonth.selectedValue), 0).getDate();
            let groupedTasks = this.tasks.filter(t => {
                if (!t.dateEnd) {
                    return false;
                }

                if (moment(t.dateEnd).format('M') == this.ddMonth.selectedValue && moment(t.dateEnd).format('YYYY') == this.ddYear.selectedValue) {
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

            this.chart = {
                type: 'bar',
                header : "График задач по дням",
                backgroundColor : ['rgba(255, 99, 132, 0.2)'],
                borderColor:  ['rgba(255, 99, 132, 1)'],
                borderWidth: 1,
                inputData: daysTasks,
                labels: tChartLabels,
            };

            
        });
    }

    private getCurrentYear() {
        return moment(Date.now()).format('YYYY');
    }

    public dateChanged() {
        this.loadTasks();
    }
}
