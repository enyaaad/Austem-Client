import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {mockupProj, Project} from "../../models/project";

@Component({
  selector: 'app-save-as',
  templateUrl: './save-as.component.html',
  styleUrls: ['./save-as.component.sass']
})
export class SaveASComponent implements AfterViewInit{
  data:Project[] = [];
  items = { ...localStorage };
  ngAfterViewInit(): void {
    this.filterLocalStorage();
    console.log(this.data)


  }
  constructor() {
  }

  filterLocalStorage(){
    for (let itemsKey in this.items) {
      if(itemsKey.includes('canvas') || itemsKey.includes('Project')){
        let proj = localStorage.getItem(itemsKey)
        if(proj)
          this.data.push({name:itemsKey,elements:[JSON.parse(proj)]})
      }
    }
  }

}
