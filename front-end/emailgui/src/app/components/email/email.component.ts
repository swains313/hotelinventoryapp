import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from './../../service/email.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {

  data={
    to:"",
    subject:"",
    message:""
  }

  constructor(private emailService:EmailService,private snak:MatSnackBar){}


  flag=false;


doSubmitForm() {
console.log("do submiit");
console.log("Data = "+this.data);

if(this.data.to=='' || this.data.subject=='' || this.data.message==''){
  this.snak.open("Field can not be Empty!!!","Ok")
  return;
}

this.flag=true;
this.emailService.sendEmail(this.data).subscribe(
response=>{
  console.log(response);
  this.flag=false;
  this.snak.open("Email Sent Succesfully","ok")
  this.data.message="";
  this.data.subject="";
  this.data.to="";
  
},error=>{
  console.log(error);
  this.flag=false;
  this.snak.open("Error","Error")
}
);


}

}
