import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {mockupProj, Project} from "../../models/project";

@Component({
  selector: 'app-save-as',
  templateUrl: './save-as.component.html',
  styleUrls: ['./save-as.component.sass']
})
export class SaveASComponent implements AfterViewInit, OnInit{
  data:Project[] = [];
  items = { ...localStorage };

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.filterLocalStorage();
  }

  constructor() {
  }

  filterLocalStorage(){
    for (let itemsKey in this.items) {
      if(!itemsKey.includes('elements')){
        let proj = localStorage.getItem(itemsKey)
        if(proj)
          this.data.push({name:itemsKey,elements:[JSON.parse(proj)]})
      }
    }
  }

}
