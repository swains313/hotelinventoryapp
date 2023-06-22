import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit{

  id:number=0;

  id$ = this.router.paramMap.pipe(map((params)=> params.get('roomid')));


  constructor(private router:ActivatedRoute) {
    // this.router.params.subscribe((params)=>{
    //   // console.log(params);
    //   // console.log(params['roomid']);
    //   this.id= params['roomid'];
    // })
  }

  ngOnInit(): void {
    // this.id=this.router.snapshot.params['roomid'];
    // this.router.paramMap.subscribe((params)=>{params.get('roomid')});
  }


}
