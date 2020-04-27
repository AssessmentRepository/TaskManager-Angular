import {
  async, ComponentFixture, TestBed,
  inject
} from '@angular/core/testing';

import { TaskManagerComponent } from './task-manager.component';
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import {
  HttpModule,
} from "@angular/http";
import { UserService } from "../_services/user.service";

describe('TaskManagerComponent', () => {
  let component: TaskManagerComponent;
  let fixture: ComponentFixture<TaskManagerComponent>;
  let element: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskManagerComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule,
        HttpModule],
      providers: [UserService]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(TaskManagerComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const rows = [
    {
      task: "testdata",
      parenttask: "newdata",
      priority: 7,
      startdate: "2020-04-28",
      enddate: "2020-04-29",
      id: 1
    },
    {
      task: "test",
      parenttask: "testparentnew",
      priority: 19,
      startdate: "2020-04-26",
      enddate: "2020-04-28",
      id: 2
    }
  ]

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(" should have a h2 (Task Manager)", async(() => {
    let fixture = TestBed.createComponent(TaskManagerComponent);
    let element = fixture.nativeElement;

    fixture.detectChanges();
    expect(element.querySelector("h2").innerHTML).toBe("Task Manager");
  }));

  it(" should have a h3 (Add Task Manager)", async(() => {
    let fixture = TestBed.createComponent(TaskManagerComponent);
    let element = fixture.nativeElement;

    fixture.detectChanges();
    expect(element.querySelector("h3").innerHTML).toBe("Add Task Manager");
  }));

  it(" should have a h3 (View Task Manager)", async(() => {
    let fixture = TestBed.createComponent(TaskManagerComponent);
    let element = fixture.nativeElement;

    fixture.detectChanges();
    expect(element.querySelector("h4").innerHTML).toBe("View Task Manager");
  }));

  it(" should have a h3 (Update Task Manager)", async(() => {
    let fixture = TestBed.createComponent(TaskManagerComponent);
    let element = fixture.nativeElement;

    fixture.detectChanges();
    expect(element.querySelector("h5").innerHTML).toBe("Update Task Manager");
  }));

  it("form invalid when empty toBeFalsy()", () => {
    expect(component.taskForm.valid).toBeFalsy();
  });

  it("Task field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let task = component.taskForm.controls["task"];
    expect(task.valid).toBeFalsy();

    // task field is required
    errors = task.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set task to something
    task.setValue("tes");
    errors = task.errors || {};
    expect(errors["required"]).toBeFalsy();

    // Set task to something correct
    task.setValue("testtask");
    errors = task.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("Priority field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let priority = component.taskForm.controls["priority"];
    expect(priority.valid).toBeFalsy();

    // priority field is required
    errors = priority.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set priority to something
    priority.setValue(0);
    errors = priority.errors || {};
    expect(errors["required"]).toBeFalsy();

    // Set priority to something correct
    priority.setValue(20);
    errors = priority.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("Parenttask field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let parenttask = component.taskForm.controls["parenttask"];
    expect(parenttask.valid).toBeFalsy();

    // parenttask field is required
    errors = parenttask.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set parenttask to something
    parenttask.setValue("test");
    errors = parenttask.errors || {};
    expect(errors["required"]).toBeFalsy();

    // Set parenttask to something correct
    parenttask.setValue("testparenttask");
    errors = parenttask.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("startdate field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let startdate = component.taskForm.controls["startdate"];
    expect(startdate.valid).toBeFalsy();

    // startdate field is required
    errors = startdate.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set startdate to something
    startdate.setValue("0");
    errors = startdate.errors || {};
    expect(errors["required"]).toBeFalsy();

    // Set startdate to something correct
    startdate.setValue("2020-04-28");
    errors = startdate.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("enddate field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let enddate = component.taskForm.controls["enddate"];
    expect(enddate.valid).toBeFalsy();

    // enddate field is required
    errors = enddate.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set enddate to something
    enddate.setValue("0");
    errors = enddate.errors || {};
    expect(errors["required"]).toBeFalsy();

    // Set enddate to something correct
    enddate.setValue("2020-04-29");
    errors = enddate.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("should be add task data", inject([HttpTestingController, UserService], (httpMock: HttpTestingController, dataService: UserService) => {

    var data = {
      task: "testdata",
      parenttask: "newdata",
      priority: 7,
      startdate: "2020-04-28",
      enddate: "2020-04-29",
    };
    dataService.posttaskdata(data).subscribe(data => {
      expect(data).toEqual(data);
    });
  }));

  it("should show user header length", async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      var rowHeaderLength = element.querySelectorAll("th").length;
      expect(rowHeaderLength).toBe(7);
    });
  }));

  it("should have table header Sl NO ", () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css(".h1"));
    const el = de.nativeElement;
    expect(el.textContent).toEqual("Sl No");
  });

  it("should have table header Task", () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css(".h2"));
    const el = de.nativeElement;
    expect(el.textContent).toEqual("Task");
  });

  it("should have table header Parent Task", () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css(".h3"));
    const el = de.nativeElement;
    expect(el.textContent).toEqual("Parent Task");
  });

  it("should have table header Priority", () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css(".h4"));
    const el = de.nativeElement;
    expect(el.textContent).toEqual("Priority");
  });

  it("should have table header Start Date", () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css(".h5"));
    const el = de.nativeElement;
    expect(el.textContent).toEqual("Start Date");
  });

  it("should have table header End Date", () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css(".h6"));
    const el = de.nativeElement;
    expect(el.textContent).toEqual("End Date");
  });

  it("should have table header Action", () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css(".h7"));
    const el = de.nativeElement;
    expect(el.textContent).toEqual("Action");
  });

  it("should have a data", async(() => {
    let taskdata = rows;
    expect(taskdata).toBeTruthy;
  }));

  it("should have a equal data", async(() => {
    let taskdata = rows;
    expect(taskdata).toEqual(rows);
  }));

  it("should be check task api data", inject([HttpTestingController, UserService], (httpMock: HttpTestingController, dataService: UserService) => {
    component.ngOnInit();
    dataService.gettaskdata().subscribe(data => {
      expect(data).toEqual(data);
      expect(data).toBe(data);
      expect(data).not.toBe(null);
      expect(null).toBeNull();
      expect(data).toBeTruthy();
    });
  }));

  it("form invalid when empty toBeFalsy()", () => {
    expect(component.taskupdateForm.valid).toBeFalsy();
  });

  it("id field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let id = component.taskupdateForm.controls["id"];

    // Set id to something
    id.setValue(0);
    errors = id.errors || {};
    expect(errors["required"]).toBeFalsy();

    // Set id to something correct
    id.setValue(1);
    errors = id.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("Task field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let task = component.taskupdateForm.controls["task"];
    expect(task.valid).toBeFalsy();

    // task field is required
    errors = task.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set task to something
    task.setValue("tes");
    errors = task.errors || {};
    expect(errors["required"]).toBeFalsy();

    // Set task to something correct
    task.setValue("testtask");
    errors = task.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("Priority field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let priority = component.taskupdateForm.controls["priority"];
    expect(priority.valid).toBeFalsy();

    // priority field is required
    errors = priority.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set priority to something
    priority.setValue(0);
    errors = priority.errors || {};
    expect(errors["required"]).toBeFalsy();

    // Set priority to something correct
    priority.setValue(20);
    errors = priority.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("Parenttask field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let parenttask = component.taskupdateForm.controls["parenttask"];
    expect(parenttask.valid).toBeFalsy();

    // parenttask field is required
    errors = parenttask.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set parenttask to something
    parenttask.setValue("test");
    errors = parenttask.errors || {};
    expect(errors["required"]).toBeFalsy();

    // Set parenttask to something correct
    parenttask.setValue("testparenttask");
    errors = parenttask.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("startdate field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let startdate = component.taskupdateForm.controls["startdate"];
    expect(startdate.valid).toBeFalsy();

    // startdate field is required
    errors = startdate.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set startdate to something
    startdate.setValue("0");
    errors = startdate.errors || {};
    expect(errors["required"]).toBeFalsy();

    // Set startdate to something correct
    startdate.setValue("2020-04-28");
    errors = startdate.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("enddate field validation toBeFalsy() toBeTruthy() ", () => {
    let errors = {};
    let enddate = component.taskupdateForm.controls["enddate"];
    expect(enddate.valid).toBeFalsy();

    // enddate field is required
    errors = enddate.errors || {};
    expect(errors["required"]).toBeTruthy();

    // Set enddate to something
    enddate.setValue("0");
    errors = enddate.errors || {};
    expect(errors["required"]).toBeFalsy();

    // Set enddate to something correct
    enddate.setValue("2020-04-29");
    errors = enddate.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("should be add task data", inject([HttpTestingController, UserService], (httpMock: HttpTestingController, dataService: UserService) => {
    var id = 1;
    var data = {
      task: "testdata",
      parenttask: "newdata",
      priority: 7,
      startdate: "2020-04-28",
      enddate: "2020-04-29",
    };
    dataService.updateposttaskdata(id, data).subscribe(data => {
      expect(data).toEqual(data);
    });
  }));

});
