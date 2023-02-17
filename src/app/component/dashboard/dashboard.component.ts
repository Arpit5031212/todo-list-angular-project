import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = "";
    this.addTaskValue = "";
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe({
      next : (res) => this.taskArr = res,
      error : (e) => alert("unable to get list of tasks")
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe({
      next : () => {
        this.ngOnInit();
        this.addTaskValue = "";
      },
      error : (e) => alert(e)
    });
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe({
      next : () => this.ngOnInit(),
      error : () => alert("failed to update task")
    });
  }

  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe({
      next : () => this.ngOnInit(),
      error : () => alert("failed to delete task")
    });
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }

}
