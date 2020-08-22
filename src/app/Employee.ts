export class Employee
{
    id:string;
    name:string;
    companyname:string;
    email:string;
    contactno:string;
    designation:string

constructor(id:string, name:string,
    companyname:string,
    email:string,
    contactno:string,
    designation:string)
{
    this.id=id;
    this.name=name;
    this.companyname=companyname;
    this.email=email;
    this.contactno=contactno;
    this.designation=designation;
}

}