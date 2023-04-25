
import {Component, OnInit} from '@angular/core';
import axios from "axios";

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
  auth(){
    let req = btoa(this.login+":"+this.password);
    console.log(req);

    let response = axios.post('http://localhost:8080/example',{},{
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Basic ' + req,
        'Access-Control-Allow-Methods' : 'POST, OPTIONS, GET, DELETE, PUT',
        'Access-Control-Allow-Origin': '*'
      }
    }).then((res) =>{
      console.log(res);
      this.isAuth = true;
      }).catch((err) =>{
        this.isError = true;
        console.log(err);
    })
  }
}
