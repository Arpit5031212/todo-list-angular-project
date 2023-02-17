import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to-do-list-app';
  taskList : any[] = [];
  @ViewChild('task') taskName : any;

  addTask(task : string) {
    this.taskList.push({id : this.taskList.length, name : task});
    this.taskName.nativeElement.value = "";
  }

  removeTask(id : number) {
    this.taskList = this.taskList.filter(task => task.id !== id);
  }
}
