import { ConfigService } from './../services/config.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  title : string="";

  // constructor(private configService:ConfigService){}

}
