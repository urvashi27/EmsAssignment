import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import {Employee} from '../Employee';
import {EmployeeService} from '../employee.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  displayedColumns: string[] = ['avatar','Name','Company Name','Email','Contact No','Designation',"actions"]
  dataSource:any;
  id:any;
  
  @Input()
    public photoUrl: string;

    @Input()
    public name: string;

    public showInitials = false;
    public initials: string;
    public circleColor: string;

    private colors = [
        '#EB7181', // red
        '#468547', // green
        '#FFD558', // yellow
        '#3670B2', // blue
    ];
   // Input variable to display properties of an employee
   @Input() employee: Employee;

   // Output variable used to tell the parent component to refesh the employee list after successful delete
   @Output() refreshEmployeeList: EventEmitter<boolean> = new EventEmitter<boolean>();
   
   // Service injected in constructor
   constructor(private employeeservice: EmployeeService, private router: Router) { 
   }
 
   // Method to edit employee details
   editEmployee(){
     
     this.router.navigate(["home/edit/"+ this.employee.id]);
   }
   
   // Method to delete an employee
   deleteEmployee(employeeToBeDeleted: Employee){
     var result = confirm("Are you sure, you want to delete this Employee?");
     if (result) {
       this.employeeservice.deleteEmployee(this.employee.id);
       this.refreshEmployeeList.emit(true);
       this.router.navigate(["list"]);
     } 
   }

  ngOnInit() {
    this.dataSource = new MatTableDataSource( this.employeeservice.allEmployees);
    if (!this.photoUrl) {
      this.showInitials = true;
      this.createInititals();

      const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
      this.circleColor = this.colors[randomIndex];
  }
}
  createInititals() {
    let initials = "";

    for (let i = 0; i < this.employee.name.length; i++) {
        if (this.employee.name.charAt(i) === ' ') {
            continue;
        }

        if (this.employee.name.charAt(i) === this.employee.name.charAt(i).toUpperCase()) {
            initials += this.employee.name.charAt(i);

            if (initials.length == 2) {
                break;
            }
        }
    }

    this.initials = initials;
}
  }


