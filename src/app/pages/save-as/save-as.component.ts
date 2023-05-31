import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Project} from "../../models/project";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {CalculatorService} from "../../services/calculator.service";

@Component({
  selector: 'app-save-as',
  templateUrl: './save-as.component.html',
  styleUrls: ['./save-as.component.sass']
})
export class SaveASComponent implements AfterViewInit, OnInit{
  data:Project[] = [];
  items = { ...localStorage };

  ngOnInit() {
    this.filterLocalStorage();
  }

  ngAfterViewInit(): void {
  }

  constructor(private cookieService: CookieService, public router: Router, public calculateService : CalculatorService) {
    this.calculateService = calculateService;
    if(!cookieService.check('token'))
      this.router.navigate(['mainpage']);
  }

  filterLocalStorage(): void{
    for (let itemsKey in this.items) {
      if(!itemsKey.includes('elements')){
        let proj = localStorage.getItem(itemsKey)
        if(proj)
          this.data.push({name:itemsKey,elements:[JSON.parse(proj)]})
      }
    }
  }

  deleteProject(projIndex: number) {
    this.data = this.data.filter((value, index, array)=>{
      localStorage.removeItem(this.data[projIndex].name);
      this.cookieService.delete(this.data[projIndex].name);
     return index !== projIndex
    })
  }

  selectProject(projIndex: number) {
    let projectElements = [...this.data[projIndex].elements]
    if(projectElements){
      localStorage.setItem('elements',JSON.stringify(projectElements[0]));
      this.cookieService.set('projectName',this.data[projIndex].name)
  }
    this.router.navigate(['constructor']);
  }


}
