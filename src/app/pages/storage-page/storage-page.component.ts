import {Component, ElementRef, ViewChild} from '@angular/core';
import {mockup, Product} from "../../models/product";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-storage-page',
  templateUrl: './storage-page.component.html',
  styleUrls: ['./storage-page.component.sass']
})
export class StoragePageComponent {
  data: Product[] = [...mockup];
  selectedItems: Set<number> = new Set();
  productName:string='';
  productAmount:number=0;
  productCost:number=0;

  constructor(private cookieService: CookieService, public router: Router) {
    if(!cookieService.check('token'))
      this.router.navigate(['mainpage']);
  }
   onlyNumbers(str:string) {
    return /^[0-9]*$/.test(str);
  }
  addElement():void{
    document.querySelectorAll('.storageInput').forEach(input=>{
      input.classList.add('storageInput-active');
    })
    console.log(this.productName,this.productAmount,this.productCost)
    if(this.productName && this.onlyNumbers(this.productCost.toString()) && this.productCost !=0 && this.onlyNumbers(this.productAmount.toString()) && this.productAmount !=0 ){
      mockup.push({id:mockup.length+1,name:this.productName, amount:this.productAmount, cost:this.productCost})
      this.data = [...mockup];
      console.log(mockup)
    }
    this.productName = '';
    this.productCost = 0;
    this.productAmount = 0;
  }
  putToSelectedItems(id:number):void{
    if(this.selectedItems.has(id)){
      this.selectedItems.delete(id);
    }else{
      this.selectedItems.add(id);
    }
    console.log( this.selectedItems);

  }
  removeElement(selectedList:Set<number>){
    selectedList.forEach(id=>{
      this.data.filter(product=>{
        console.log(product.id,id)
        return this.data
      })
    })
  }

  editElement(){

  }
}
