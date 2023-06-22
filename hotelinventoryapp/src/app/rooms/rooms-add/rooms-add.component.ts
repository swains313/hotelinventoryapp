import { Component } from '@angular/core';
import { RoomList } from '../room';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent {

  constructor(private roomsService:RoomsService){}

  successMessage : string ='' ;

  AddRoom(roomsForm:NgForm) 
  {
    this.roomsService.addRoom(this.room).subscribe((data)=>{
      this.successMessage = 'Rooms Added successfully';
      // roomsForm.reset();
      roomsForm.resetForm({
        roomType:'',
        amenities:'',
        price:0,
        photos:'',
        checkinTime: new Date(),
        checkoutTime:new Date(),
        rating:0
      })
    })
  }

  room:RoomList={

    roomType:'',
    amenities:'',
    price:0,
    photos:'',
    checkinTime: new Date(),
    checkoutTime:new Date(),
    rating:0
  }

}
