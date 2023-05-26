
import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../../services/auth-service.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})

export class MainPageComponent{
  login:string ='';
  password: string ='';
  isError: boolean = false;
  isAuth: boolean  = false;

  constructor(private authService: AuthService, private cookieService: CookieService) {
    this.isAuth = this.cookieService.check('token');
  }

  async auth(){
      if(await this.authService.auth(this.login, this.password)){
        this.isAuth = true
      }else{
        this.isError = true;
      }
  }




}
