import {Component, OnInit, AfterViewInit, OnDestroy, AfterViewChecked} from '@angular/core';
import {Project} from "../../models/project";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {CalculatorService} from "../../services/calculator.service";
import {SaveasServiceService} from "../../services/saveas-service.service";

@Component({
  selector: 'app-save-as',
  templateUrl: './save-as.component.html',
  styleUrls: ['./save-as.component.sass']
})
export class SaveASComponent implements OnInit{
  data: Project[] = [];
  saveAs = new SaveasServiceService(this.cookieService,this.calculateService);
  items = {...localStorage};
  ngOnInit() {
    this.saveAs.filterLocalStorage();
    this.data = this.saveAs.data;
    this.pushCosts(this.data)
  }

  constructor(private cookieService: CookieService, public router: Router, public calculateService: CalculatorService) {
    if (!cookieService.check('token'))
      this.router.navigate(['mainpage']);
  }

  pushCosts(data:Project[]){
    for (let itemsKey in this.items){
      if(Array.from(itemsKey).includes('c')){
        data.forEach((el)=>{
          if(el.name==itemsKey.slice(5))
            el.cost = JSON.parse(localStorage.getItem("cost " + itemsKey.slice(5)) || "")
        })
      }
    }

  }
  deleteProject(projIndex: number) {
    this.data = this.data.filter((value, index, array) => {
      localStorage.removeItem(this.data[projIndex].name);
      localStorage.removeItem("cost "+ this.data[projIndex].name);
      this.cookieService.delete(this.data[projIndex].name);
      return index !== projIndex
    })
  }
  selectProject(projIndex: number) {
    console.log(this.data)
    let projectElements = [...this.data[projIndex].elements || []]
    if (projectElements) {
      localStorage.setItem('elements', JSON.stringify(projectElements[0]));
      this.cookieService.set('projectName', this.data[projIndex].name)
    }
    this.router.navigate(['constructor']);
  }


}
