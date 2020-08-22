import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import {Employee} from '../Employee';
import {EmployeeService} from '../employee.service';
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  Employeeform:FormGroup;
  employee:Employee;
  name:string;
  companyname:string;
  email:string;
  contactno:string;
  designation:string;
  initials:string;
  
  public circleColor: string;

  private colors = [
      '#EB7181', // red
      '#468547', // green
      '#FFD558', // yellow
      '#3670B2', // blue
  ];
  ngOnInit()
  {
    
      this.Employeeform = this.fb.group({
    
     name: ['', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
     companyname: ['',Validators.required],
     email: ['',[Validators.required,Validators.email]],
     contactno: ['',[Validators.required,Validators.maxLength(10)]],
     designation:['',Validators.required]
     
   });
   const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
   this.circleColor = this.colors[randomIndex];
   

  }
  constructor(private employeeservice:EmployeeService,private fb: FormBuilder,private router:Router)
  {

  }
   save(){
     if(this.Employeeform.invalid)
     return;
    this.employee= new Employee(this.makeRandomID(), this.Employeeform.value.name, 
    this.Employeeform.value.companyname,
     this.Employeeform.value.email,
     this.Employeeform.value.contactno, 
     this.Employeeform.value.designation);
     
     this.employeeservice.addEmployee(this.employee);
     this.router.navigate(["list"]);
   }

   //Method to cancel the add operation
   cancelEmployee(){
     this.router.navigate(["list"]);
   }

  // Creates random id for employee
  makeRandomID(): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  createInititals(){
    let initials = this.Employeeform.value.name;
  
    for (let i = 0; i < this.Employeeform.value.name.length; i++) {
        if (this.employee.name.charAt(i) === ' ') {
            continue;
        }
  
        if (this.Employeeform.value.name.charAt(i) === this.Employeeform.value.name.charAt(i).toUpperCase()) {
            initials += this.Employeeform.value.name.charAt(i);
  
            if (initials.length == 2) {
                break;
            }
        }
    }
  
    this.initials = initials;
  }

}
