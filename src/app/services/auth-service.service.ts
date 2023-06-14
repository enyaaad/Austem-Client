 import { Injectable } from '@angular/core';
import axios from "axios";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookieService: CookieService) { }
  public isAuth: boolean  = false;

  async auth(login:string,password:string){
    let response = await axios.post('http://localhost:8080/user/auth',{
      "username":login,
      "password":password
    }).then((res) =>{
      if(res.data.status == "success"){
        this.cookieService.set('token',res.data.token)
        this.isAuth = true
      }
      else
        this.isAuth = false
    }).catch(err =>{})
    return this.isAuth
  }
}
