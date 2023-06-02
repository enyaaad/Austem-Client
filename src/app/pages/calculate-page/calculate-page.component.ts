import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../models/project";
import {pipe} from "../../models/pipe";
import {CalculatorService} from "../../services/calculator.service";
import {Router} from "@angular/router";
import {ConstructorComponent} from "../constructor/constructor.component";

@Component({
  selector: 'app-calculate-page',
  templateUrl: './calculate-page.component.html',
  styleUrls: ['./calculate-page.component.sass']
})

export class CalculatePageComponent implements OnInit, AfterViewInit{

  @ViewChild('stepsOne') firstStep!: ElementRef;
  @ViewChild('stepsTwo') secondStep!: ElementRef;
  @ViewChild('stepsThree') thirdStep!: ElementRef;

  selectedPipe: pipe = {diameter:20,price:42};

  pipesCount: number = 0 ;
  pipesToCount: number = 0;
  radiatorCount:number = 0 ;
  boilerCount:number = 0;
  private step : number = 1;

  calculated: number = 0;

  PipeTypes:pipe[] = [
    {diameter: 20, price: 42},
    {diameter: 25, price: 69},
    {diameter: 32, price: 111},
    {diameter: 40, price: 176},
    {diameter: 50, price: 274},
    {diameter: 63, price: 427}
  ]

  constructor(public calculator: CalculatorService, public router: Router, ) {
  }

  ngOnInit() {
    this.pipesCount = this.calculator.pipes;
    this.boilerCount = this.calculator.boilers;
    this.radiatorCount = this.calculator.radiators;
  }
  ngAfterViewInit() {

  }
  nextStep(){
    if(this.firstStep.nativeElement.classList.contains('shown')){
      this.checkPipes();
      this.firstStep.nativeElement.classList.remove('shown')
      this.firstStep.nativeElement.classList.add('hidden')
      this.secondStep.nativeElement.classList.add('shown')
      this.step++;
      return
    }
    if(this.secondStep.nativeElement.classList.contains('shown')){
      this.secondStep.nativeElement.classList.remove('shown')
      this.secondStep.nativeElement.classList.add('hidden')
      this.thirdStep.nativeElement.classList.add('shown')
      this.thirdStep.nativeElement.classList.remove('hidden')
      this.step++;
      return
    }
    if(this.thirdStep.nativeElement.classList.contains('shown')){
      this.calculator.pushPrice(this.calculated);
      this.router.navigate(['saveas'])
    }
  }
  countBoilers(){
    this.calculated += Math.round(this.boilerCount*this.calculator.randomNumberBetween(15000,30000));
  }
  countRadiators(){
    this.calculated += Math.round(this.radiatorCount*this.calculator.randomNumberBetween(2000,4000));
  }
  checkPipes(){
    if(this.pipesCount>0){
      this.calculated += this.pipesCount*this.PipeTypes[0].price;
      this.pipesCount = 0;
    }
  }


  countPipes(count:number){
    if(count>this.pipesCount){
      count = this.pipesCount
    }
    if(this.pipesCount > 0){
      this.PipeTypes.forEach(pipetype=>{
        if(pipetype.diameter == parseInt((this.selectedPipe.toString()))){
          this.calculated += count*pipetype.price;
          this.pipesCount = this.pipesCount - count;
          return
        }
      })
    }
  }
}
