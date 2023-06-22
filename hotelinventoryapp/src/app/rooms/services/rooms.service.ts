import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { APP_CONFIG } from '../../AppConfig/appconfig.service';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../room';

import {environment} from '../../../environments/environment'
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { shareReplay } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class RoomsService {

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig ,
    private http: HttpClient
    ) { 
    console.log(this.config.apiEndPoint);  
    console.log("Room service intialized");
  }


//  headers=new HttpHeaders({'token':'1234334jhfhf'});
  getRooms$=this.http.get<RoomList[]>('/api/rooms',
  // {headers:this.headers}
  ).pipe(
    shareReplay(1)
  );

  roomList:RoomList[] = [];


  getRooms(){
  return  this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room: RoomList){
    return this.http.post<RoomList[]>('/api/rooms',room,
    // {headers:this.headers}
    );
  }


  editRoom(room: RoomList){
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`,room);
  }

  delete(id: string){
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos(){
    const request=new HttpRequest('GET','https://jsonplaceholder.typicode.com/photos',
    {
      reportProgress: true,
    }
    );
    return this.http.request(request);
  }

}
