import { Component } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent {
  login:string = "";
  password: string = "";
  isAuth:boolean = false;

  async auth(){
    let req = btoa(this.login + ":" + this.password)
    const {data} = await axios.post('http://localhost:8080/example', req, {
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(data);
  }
}
