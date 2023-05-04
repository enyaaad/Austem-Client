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
  productAmount?:number;
  productCost?:number;
  productNameforEdit:string='';
  productAmountforEdit?:number;
  productCostforEdit?:number;
  isError:boolean = false;

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
    if(this.productAmount && this.productCost){
      if(this.productName && this.onlyNumbers(this.productCost.toString()) && this.productCost !=0 && this.onlyNumbers(this.productAmount.toString()) && this.productAmount !=0 ){
        mockup.push({id:mockup.length+1,name:this.productName, amount:this.productAmount, cost:this.productCost,isSelected:false})
        this.data = [...mockup];
        console.log(mockup)
      }
      this.productName ='';
      this.productAmount = undefined;
      this.productCost = undefined;
      document.querySelectorAll('.storageInput').forEach(input=>{
        input.classList.remove('storageInput-active');
      })
    }
  }
  putToSelectedItems(id:number):void{
    if(this.selectedItems.has(id)){
      this.selectedItems.delete(id);
    }else{
      this.selectedItems.add(id);
    }
  }
  removeElement(selectedList:Set<number>){
    selectedList.forEach(id=>{
      this.data = this.data.filter(function (product){
        return (id !== product.id)
      })
    })
    this.selectedItems.clear();
  }

  selectItem(index:number) {
    this.data.forEach(el=>{
      if(el.id == index)
        el.isSelected = !el.isSelected;
    })
  }

  editItem() {
    if(this.selectedItems.size == 1){
      this.isError = false;
      document.querySelectorAll('.editInput').forEach(input=>{
        input.classList.add('editInput-active');
      })
      if(this.productCostforEdit && this.productAmountforEdit)
      if(this.productNameforEdit && this.onlyNumbers(this.productCostforEdit.toString()) && this.productCostforEdit !=0 && this.onlyNumbers(this.productAmountforEdit.toString()) && this.productAmountforEdit !=0 ){
        this.data.forEach(el=>{
          if(el.isSelected){
            el.name = this.productNameforEdit
            el.amount = this.productAmountforEdit
            el.cost = this.productCostforEdit
          }
        })
        this.productNameforEdit ='';
        this.productAmountforEdit = undefined;
        this.productCostforEdit = undefined;
      }

    }
    else if(this.selectedItems.size >1 ){
      document.querySelectorAll('.editInput').forEach(input=>{
        input.classList.remove('editInput-active');
      })
      this.isError = true;
    }
    else{
      document.querySelectorAll('.editInput').forEach(input=>{
        input.classList.remove('editInput-active');
      })
      this.isError = false;
    }
  }
}
