import {CanvasElement} from "./Element";

export class Project{
  name!:string;
  elements!:CanvasElement[];
}

export const mockupProj:Project[] =
  [
    {name: 'canvas 9248',elements: [{x: 418.625, y: 204.203125, size: 50, color: "red"}]},
  ]
