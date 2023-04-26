import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-countfloors',
  templateUrl: './countfloors.component.html',
  styleUrls: ['./countfloors.component.sass']
})
export class CountfloorsComponent {

  constructor(private cookieService: CookieService, public router: Router) {
    if(!cookieService.check('token'))
      this.router.navigate(['mainpage']);
  }
}
