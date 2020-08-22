import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

import { HomeComponent } from './home/home.component';

const routes: Routes = 
[{
  path: 'home',
  component:HomeComponent,

          children: [
            {
          path:"list",
          component:EmployeeListComponent
          },
          {
            path:'add',
            component:AddEmployeeComponent
          },
          {
            path:'edit/:id',
            component:EditEmployeeComponent
          }
          ]},

   {
     path:'**',
     redirectTo:'home/list'
   }
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
