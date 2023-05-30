import {Component, Input} from '@angular/core';
import {Project} from "../../models/project";

@Component({
  selector: 'app-calculate-page',
  templateUrl: './calculate-page.component.html',
  styleUrls: ['./calculate-page.component.sass']
})

export class CalculatePageComponent {

  pipeDiameter = 20;
  PipeTypes = new Map<number, number>([
    [20, 42],
    [25, 69],
    [32, 111],
    [40, 176],
    [50, 274],
    [63, 427],
  ]);

  countItems(){

  }
}
