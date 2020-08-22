import { Injectable } from '@angular/core';
import {Employee} from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  allEmployees:Employee[]=[
    {
      "id":"101",
      "name":"Urvashi",
      "companyname":"lgp",
      "email":"urvashi@gmail.com",
      "contactno":"123456789",
      "designation":"Associate Lead"
    },
    
  ];
  
  getAllEmployees():Employee[]
  {
    return this.allEmployees;
  }
  addEmployee(employee:Employee)
  {
    this.allEmployees.push(employee);
    console.log(this.allEmployees);
  }
  updateEmployee(employee:Employee){
    var updateEmployee = this.allEmployees.find(emp => emp.id == employee.id);
    updateEmployee.name = employee.name;
    updateEmployee.companyname = employee.companyname;
    updateEmployee.email = employee.email;
    updateEmployee.contactno=employee.contactno;
    updateEmployee.designation = employee.designation;
  }

  // Deletes an employee from employee list
  deleteEmployee(id:string){
    this.allEmployees = this.allEmployees.filter(employee => employee.id != id);
  }

  // Returns an employee with passed employee id from employee list
  getEmployee(id:string):Employee{
    return this.allEmployees.find(emp => emp.id == id);
  }

 

}
