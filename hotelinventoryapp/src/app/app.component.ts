import { InitService } from './init.service';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
// import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstorage.token'
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: `Hello world from inline template
  // <p>hello p</p>
  // `,
  styleUrls: ['./app.component.scss']
 // styles: [`h1{color:red;}`]
})
export class AppComponent implements OnInit {
  
  // ngAfterViewInit() {
  //   const componentRef=this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms=50;
  // }
  // @ViewChild('user',{read:ViewContainerRef}) vcr!: ViewContainerRef;




  @ViewChild('name',{static:true}) name!: ElementRef;


  constructor(@Optional() private loggerService: LoggerService, 
  @Inject(localStorageToken)private localStorage:any,
  private initService:InitService, private configService:ConfigService,
  private router:Router
  ){
    console.log(initService.config);
    
  }

  ngOnInit() {
    // console.log("NGONIN");
    // this.router.events.subscribe((event)=>{
    //   console.log(event);
    // });


    this.router.events.pipe(
      filter((event)=> event instanceof NavigationStart)
  ).subscribe((event)=> {
    console.log('NavigationStart');
    
  });

  this.router.events.pipe(
    filter((event)=> event instanceof NavigationEnd)
).subscribe((event)=> {
  console.log('NavigationEnd');
});



    this.loggerService?.log('AppComponent.ngOnInit()');
    //this.name.nativeElement.innerText="Taj Hotel"; 
  // this.localStorage.seItem('name','Taj hotel');

    
}



  title = 'hotelinventoryapp';



  role='Admin';

}
