
import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})

export class MainPageComponent{
  login:string ='';
  password: string ='';
  isAuth:boolean = false;
  isError:boolean = false;

  constructor(private cookieService: CookieService) {
  }
  auth():void{
    let req = btoa(this.login+":"+this.password);

    if(req != "YXNkOjEyMw=="){
      this.isError = true;
    }else{
      this.isAuth = true;
      this.cookieService.set('token',req)
    }

  }

  comm(){
    /*let response = axios.post('http://localhost:8080/example',{},{
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Basic ' + req,
        'Access-Control-Allow-Methods' : 'POST, OPTIONS, GET, DELETE, PUT',
        'Access-Control-Allow-Origin': '*'
      }
    }).then((res) =>{
      console.log(res);
      this.isAuth = true;
      this.cookieService.set('token',req)
    }).catch((err) =>{
      this.isError = true;
    })*/
  }
}
