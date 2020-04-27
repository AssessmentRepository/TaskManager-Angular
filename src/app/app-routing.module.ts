import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskManagerComponent } from './task-manager/task-manager.component';

const routes: Routes = [
  { path: "app-task-manager", component: TaskManagerComponent },
  { path: "**", redirectTo: "app-task-manager" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
