import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../_services";

export class Task {
  constructor(
    public task: string,
    public priority: number,
    public parenttask: string,
    public startdate: string,
    public enddate: string,
  ) { }
}
export class Taskupdate {
  constructor(
    public id:string,
    public task: string,
    public priority: number,
    public parenttask: string,
    public startdate: string,
    public enddate: string,
  ) { }
}
@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {

  @Output() taskdata = new EventEmitter<Task>();
  @Output() taskdataupdate = new EventEmitter<Taskupdate>();

  taskForm: FormGroup;
  taskupdateForm: FormGroup;
  public obj: any = {};
  public objupdate: any = {};

  constructor(private fb: FormBuilder,
    private userService: UserService
  ) { }
  taskData: any;
  taskDataupdate: any = [];

  ngOnInit() {
    this.gettask();
    this.taskForm = this.fb.group({
      task: ["", [Validators.required]],
      priority: ["", [Validators.required]],
      parenttask: ["", [Validators.required]],
      startdate: ["", [Validators.required]],
      enddate: ["", [Validators.required]],
    });
    this.taskupdateForm = this.fb.group({
      id: [""],
      task: ["", [Validators.required]],
      priority: ["", [Validators.required]],
      parenttask: ["", [Validators.required]],
      startdate: ["", [Validators.required]],
      enddate: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.obj = { ...this.taskForm.value, ...this.obj };
    this.taskForm.value;
    console.log("TaskManagerComponent -> onSubmit ->  this.taskForm.value", this.taskForm.value)


    if (this.taskForm.valid) {
      this.taskdata.emit(
        new Task(
          this.taskForm.value.task,
          this.taskForm.value.priority,
          this.taskForm.value.parenttask,
          this.taskForm.value.startdate,
          this.taskForm.value.enddate
        )
      );
    }

    var data = this.taskForm.value;
    this.userService.posttaskdata(data).subscribe(
      data => {
        console.log(
          "LOG: LoginComponent -> onSubmit -> data",
          JSON.stringify(data)
        );
        this.taskData = data;
      },
      error => {
        console.log("TaskManagerComponent -> onSubmit -> error", error)

      }
    );
  }

  onSubmitupdate() {
    this.objupdate = { ...this.taskupdateForm.value, ...this.obj };
    this.taskupdateForm.value;
    console.log("TaskManagerComponent -> onSubmit ->  this.taskupdateForm.value", this.taskupdateForm.value)


    if (this.taskupdateForm.valid) {
      this.taskdata.emit(
        new Taskupdate(
          this.taskupdateForm.value.id,
          this.taskupdateForm.value.task,
          this.taskupdateForm.value.priority,
          this.taskupdateForm.value.parenttask,
          this.taskupdateForm.value.startdate,
          this.taskupdateForm.value.enddate
        )
      );
    }

    var data = {
      "task": this.taskupdateForm.value.task,
      "parenttask": this.taskupdateForm.value.parenttask,
      "priority": this.taskupdateForm.value.priority,
      "startdate": this.taskupdateForm.value.startdate,
      "enddate": this.taskupdateForm.value.enddate
    };

    var id = this.taskupdateForm.value.id;
    this.userService.updateposttaskdata(id, data).subscribe(
      data => {
        console.log("TaskManagerComponent -> onSubmitupdate -> data", data)

        this.taskData = data;
      },
      error => {
        console.log("TaskManagerComponent -> onSubmitupdate -> error", error)

      }
    );
  }

  gettask() {
    this.userService.gettaskdata().subscribe(
      data => {
        console.log("TaskManagerComponent -> gettask ->  data", data)

        this.taskDataupdate = data;

      },
      error => {
        console.log("TaskManagerComponent -> gettask -> error", error)

      }
    );
  }

  update(id, task, parenttask, priority, startdate, enddate) {

    this.taskupdateForm.setValue({
      "id": id,
      "task": task,
      "parenttask": parenttask,
      "priority": priority,
      "startdate": startdate,
      "enddate": enddate
    })
  }
  clearInput() {
    this.taskupdateForm.setValue({
      "task": '',
      "parenttask": '',
      "priority": '',
      "startdate": '',
      "enddate": '',
    })
  }
}
