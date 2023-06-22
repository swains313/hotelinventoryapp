import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../room';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnChanges,OnDestroy{
 
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['title']){
      this.title=changes['title'].currentValue.toUpperCase();
    } 
  }



  @Input() price=0 ;




   @Input ()rooms:RoomList[] =[];

  //  @Input ()rooms:RoomList[] | null=[];



  @Input() title:string=' ';

  @Output() selectedRoom = new EventEmitter<RoomList>();


  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
    }

    ngOnDestroy(): void {
      console.log("on destroy called");
      
    }

}
