import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../models/project";
import {pipe} from "../../models/pipe";
import {CalculatorService} from "../../services/calculator.service";

@Component({
  selector: 'app-calculate-page',
  templateUrl: './calculate-page.component.html',
  styleUrls: ['./calculate-page.component.sass']
})

export class CalculatePageComponent implements OnInit, AfterViewInit{

  @ViewChild('select') select!: ElementRef<HTMLSelectElement>;

  selectedPipe: pipe = {diameter:0,price:0};

  pipesCount: number |undefined ;
  radiatorCount:number |undefined;
  boilerCount:number | undefined;

  calculated: number = 0;

  PipeTypes:pipe[] = [
    {diameter: 20, price: 42},
    {diameter: 25, price: 69},
    {diameter: 32, price: 111},
    {diameter: 40, price: 176},
    {diameter: 50, price: 274},
    {diameter: 63, price: 427}
  ]

  constructor(public calculator: CalculatorService) {
  }

  ngOnInit() {
    this.pipesCount = this.calculator.pipes;
    this.boilerCount = this.calculator.boilers;
    this.radiatorCount = this.calculator.radiators;
  }
  ngAfterViewInit() {

  }

  countPipes(){

  }
  calculatePipes(){

  }
  calculate() {
    let pipeCost;
    let boilerCost;
    let radiatorCost;


  }
}
