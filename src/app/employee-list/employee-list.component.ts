import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import{Router} from '@angular/router';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  _listFilterBy: string;
  allEmployees: Employee[];
  filteredList: Employee[];

  // Service injected in constructor
  constructor(private employeeservice:EmployeeService, private router: Router) { }

  // Gets filter by value from the search box
  get listFilterBy(): string {
    return this._listFilterBy;
  }

  // Sets filter by value from the search box
  set listFilterBy(value: string) {
    this._listFilterBy = value;
    this.filteredList = this._listFilterBy ? this.performFilter(this._listFilterBy) : this.allEmployees;
  }

  // Method to filter the employees on basis of filter by value
  performFilter(filterBy: string): Employee[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.allEmployees.filter((employee: Employee) => employee.name.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
     employee.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  // Initializes all employees list from employee service
  ngOnInit() {
    this.allEmployees = this.employeeservice.getAllEmployees();
    this.filteredList = this.allEmployees;
    this._listFilterBy = "";
  }

  // Method to add an employee to the list
  addEmployee(){
    this.router.navigate(["home/add"]);
  }

  // Method to refresh the employee list after successful delete
  refreshList(){
    this.allEmployees = this.employeeservice.getAllEmployees();
    this.filteredList = this.allEmployees;
  }

}
