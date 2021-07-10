import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: "",
  redirectTo: "todos",
  pathMatch: "full",
}, {
  path: "todos",
  loadChildren: () => import('@/app/views/todos/todos.module')
    .then(m => m.TodosModule),
}];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { paramsInheritanceStrategy: "always" }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
