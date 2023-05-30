import { Injectable } from '@angular/core';
import {Project} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  currentProject:Project = {name:"",elements:[]};
  constructor() { }

  getProject(project:Project):void{

  }
}
