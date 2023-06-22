import { RoomsService } from './../rooms/services/rooms.service';
import { AfterContentInit, Component, ContentChild, Host, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  // providers:[RoomsService]
})
export class ContainerComponent implements OnInit,AfterContentInit{

@ContentChild(EmployeeComponent) employee!:EmployeeComponent;

  ngOnInit(): void {
    
  }
  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.empName="eick";
    
  }


  // constructor(@Host() private roomService: RoomsService){}
  constructor( private roomService: RoomsService){}


}
