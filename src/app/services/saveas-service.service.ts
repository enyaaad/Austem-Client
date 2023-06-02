import { Injectable } from '@angular/core';
import {Project} from "../models/project";
import {CookieService} from "ngx-cookie-service";
import {CalculatorService} from "./calculator.service";

@Injectable({
  providedIn: 'root'
})
export class SaveasServiceService {
  data: Project[] = [];
  items = {...localStorage};
  constructor(private cookieService: CookieService, private calc: CalculatorService) {


  }

  filterLocalStorage(): void {
    let calculated = this.calc.data;
    for (let itemsKey in this.items) {
      if (!itemsKey.includes('elements') && !Array.from(itemsKey).includes('c')) {
        let proj = localStorage.getItem(itemsKey)
        if (proj){
          if(calculated.name == itemsKey){
            if(calculated.cost)
              localStorage.setItem("cost "+itemsKey,calculated.cost.toString())
            this.data.push({name: itemsKey, elements: [JSON.parse(proj)], cost: calculated.cost})
          }else{
            this.data.push({name: itemsKey, elements: [JSON.parse(proj)], cost: 0})
          }
        }
      }
    }
  }


}
