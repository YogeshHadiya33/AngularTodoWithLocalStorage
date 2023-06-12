import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskModel } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  list: TaskModel[] = []
  task: string = "";
  searchText: string = "";

  ngOnInit(): void {
    this.list = this.GetAll();
  }

  Add() {
    if (this.task != null && this.task != "") {
      let obj: TaskModel = {
        TaskId: new Date().getTime(),
        TaskName: this.task,
        IsComplete: false
      };
      this.list.push(obj);
      this.Save(this.list);
      this.task = '';
    }
  }

  ChangeStatus(taskId: number, currentValue: boolean) {
    debugger;
    let newList: TaskModel[] = this.GetAll();
    let index = newList.findIndex(x => x.TaskId == taskId);
    if (index != null && typeof index == "number" && newList.length > index) {
      let obj = newList[index];
      if (obj != null && typeof obj != "undefined") {
        obj.IsComplete = !currentValue;
        newList[index] = obj;
        this.Save(newList);
        this.list = this.Search();
      }
    }
  }

  Delete(taskId: number) {
    let newList: TaskModel[] = this.GetAll();
    let index = newList.findIndex(x => x.TaskId == taskId);
    if (index != null && typeof index == "number" && newList.length > index) {
      newList.splice(index, 1);
      this.Save(newList);
      this.list = this.Search();
    }
  }

  DeleteAll() {
    this.list = [];
    this.Save(this.list);
  }

  Save(list: TaskModel[]) {
    localStorage.setItem("todo", JSON.stringify(list));
  }

  GetAll() {
    let value = localStorage.getItem("todo");
    if (value != '' && value != null && typeof value != "undefined") {
      return JSON.parse(value!);
    }
    return [];
  }

  SearchTask() {
    if (this.searchText != null && this.searchText != "" && typeof this.searchText != "undefined") {
      this.list = this.Search();
    }
  }

  Search() {
    let newList = this.GetAll();
    return newList.filter((x: TaskModel) => {
      return x.TaskName.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase());
    });
  }

  Clear() {
    this.searchText = "";
    this.list = this.Search();
  }

}
