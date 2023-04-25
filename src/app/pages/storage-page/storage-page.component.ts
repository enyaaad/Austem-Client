import { Component } from '@angular/core';
import {mockup, Product} from "../../models/product";


@Component({
  selector: 'app-storage-page',
  templateUrl: './storage-page.component.html',
  styleUrls: ['./storage-page.component.sass']
})
export class StoragePageComponent {
  data: Product[] = [...mockup];

}
