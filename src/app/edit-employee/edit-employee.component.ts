import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Employee } from '../Employee';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  Employeeform:FormGroup;
  employee:Employee;

  constructor(private fb: FormBuilder,private employeeservice:EmployeeService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit()
  {
    var id = this.route.snapshot.params["id"];
    this.employee = this.employeeservice.getEmployee(id);
  
       this.Employeeform = this.fb.group({
   
      name: ['', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      companyname: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      contactno: ['',[Validators.required,Validators.maxLength(10)]],
      designation:['',Validators.required]
   });
  }
  


// Method to update and employee
updateEmployee(){
  this.employeeservice.updateEmployee(this.employee);
  this.router.navigate(["list"]);
}

// Method to cancel update employee operation
cancelEmployee(){
  this.router.navigate(["list"]);
}


}
