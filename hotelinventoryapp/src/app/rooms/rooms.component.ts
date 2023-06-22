import { ConfigService } from './../services/config.service';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Room, RoomList } from './room';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked,OnDestroy
{

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;
  

   roomList: RoomList[] = [];
 


  
  addRoom() {
    const room: RoomList = {
      //roomNumber: '123',
      roomType: 'deluxe',
      amenities: 'ac air',
      price: 2000,
      photos: '',
      checkinTime: new Date('13-Nov-2021'),
      checkoutTime: new Date('14-Nov-2021'),
      rating: 3.7676,
    };
    // this.roomList.push(room);
    //this.roomList = [...this.roomList, room];

    this.roomsService.addRoom(room).subscribe((data)=>{
     this.roomList=data;
    });
  }
  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  selectedRoom!: RoomList;

  hideRooms = true;

  hotelName = 'Taj Hotel';

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  numberOfRooms = 10;

  title = 'Room List';

  doSubmit() {
    console.log('do submit');
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  

  stream=new Observable(osbserver=>{
    osbserver.next('user1');
    osbserver.next('user2');
    osbserver.next('user3');
    osbserver.complete();
    // osbserver.error('error');
  });


  totalBytes=0;


  subscrition!: Subscription;



  error$ =new Subject<string>;

  getError$ =this.error$.asObservable();


  rooms$=this.roomsService.getRooms$.pipe(
    catchError((err)=>{
     // console.log(err);
      this.error$.next(err.message)
      return of([]);
    })
  );

  roomsCount$ =this.roomsService.getRooms$.pipe(
    map((rooms)=>rooms.length)
  );


  ngOnInit(): void {


 

    this.roomsService.getPhotos().subscribe((event)=>{
      switch(event.type) {
        case HttpEventType.Sent:{
          console.log("REQUEST HAS BEEN MADE!");
          break;
        }
        case HttpEventType.ResponseHeader:{
          console.log("REQUEST SUCCESS");
          break;
        }
        case HttpEventType.DownloadProgress:{
          this.totalBytes +=event.loaded; 
          break;
        }
        case HttpEventType.Response:{
          console.log(event.body);
          break;
        }
      };
      
    })


    this.stream.subscribe({
      next: (value)=>console.log(value),
      complete: ()=>console.log('complete'),
      error: (err)=>console.log(err)
    });
    this.stream.subscribe((data)=>console.log(data));

    // console.log(this.headerComponent);
    // this.roomList=this.roomsService.getRooms();
  //  this.roomsService.getRooms$.subscribe(rooms =>{
  //     this.roomList=rooms;
  //   });
  
  }
  

  constructor(@SkipSelf() private roomsService:RoomsService, private configService:ConfigService) {
   // this.roomList=this.roomsService.getRooms();
  }

  ngAfterViewChecked(): void {}

  ngAfterViewInit(): void {
    // console.log(this.headerComponent);
    this.headerComponent.title = 'Room View';

    console.log((this.headerChildrenComponent.last.title = 'Last title'));
    //this.headerChildrenComponent.get(0)
  }

  ngDoCheck(): void {
    console.log('Do check called');
  }


  editRoom() {

    const room: RoomList = {
      roomNumber: '3',
      roomType: 'deluxe taj hotel',
      amenities: 'ac air',
      price: 2000,
      photos: '',
      checkinTime: new Date('13-Nov-2021'),
      checkoutTime: new Date('14-Nov-2021'),
      rating: 3.7676,
    };
    this.roomsService.editRoom(room).subscribe((data)=>{
      this.roomList=data;
    })
    
    }

    deleteRoom()
    {
      this.roomsService.delete('3').subscribe((data)=>{
        this.roomList=data;
      })
    }

    ngOnDestroy(): void {
        if(this.subscrition){
          this.subscrition.unsubscribe();
        }
    }


    // priceFilter = new FormControl(0) ;

    priceFilter = new FormControl() ;


}






// {
//   roomNo:101,
// roomType:"Deluxe Room",
// amenities:"Air Condition free wifi",
// price:500,
// photos:"",
// checkInTime:new Date('11-Nov-2021'),
// checkOutTime:new Date('12-Nov-2021'),
// rating:4.5
// },
// {
//   roomNo:105,
//   roomType:"Deluxe Room",
//   amenities:"Air Condition free wifi",
//   price:2000,
//   photos:"",
//   checkInTime:new Date('13-Nov-2021'),
//   checkOutTime:new Date('14-Nov-2021'),
//   rating:3.7676
//   },
//   {
//     roomNo:1066,
//     roomType:"Private ",
//     amenities:"Air Condition free wifi",
//     price:5000,
//     photos:"",
//     checkInTime:new Date('16-Nov-2021'),
//     checkOutTime:new Date('21-Nov-2021'),
//     rating:2.4
//     }
