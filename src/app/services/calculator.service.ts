import {Injectable, OnInit} from '@angular/core';
import {Project} from "../models/project";
import {CanvasElement} from "../models/Element";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService implements OnInit{
  data:Project = {name:"",cost:0};
  pipes: number = 0;
  boilers: number = 0;
  radiators: number = 0;
  constructor() { }

  ngOnInit() {

  }
  public randomNumberBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  pushPrice(calculated:number){
    this.data.cost = calculated;
    console.log(this.data)
  }

  async getProject(project: any): Promise<void>{
    this.data =  project;
    this.pipes = 0;
    this.boilers = 0;
    this.radiators = 0;

    let arr = [...project.elements];
    await arr[0].forEach((el:CanvasElement)=>{
      switch (el.type){
        case "line":
          this.pipes += 1
          break
        case "square":
          this.boilers +=1
          break
        case "rectangle":
          this.radiators +=1
          break
      }
    })
    console.log(this.boilers,this.pipes,this.radiators)
  }
}
