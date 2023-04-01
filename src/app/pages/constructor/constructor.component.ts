import {Component, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {KonvaComponent} from "ng2-konva";

declare const Konva: any;
let ng: any;
@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.sass']
})
export class ConstructorComponent {
  @ViewChild('stage') stage!: KonvaComponent;
  @ViewChild('layer') layer!: KonvaComponent;
  @ViewChild('dragLayer') dragLayer!: KonvaComponent;
  public handleDragend(ngComponent: KonvaComponent) {
    const shape = ngComponent.getStage();
    const layer = ng.layer.getStage();
    const stage = ng.stage.getStage();

    shape.moveTo(layer);
    stage.draw();

    shape.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: ngComponent.getConfig().startScale,
      scaleY: ngComponent.getConfig().startScale,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  }
  public configStage: Observable<any> = of({
    width: 800,
    height: 400
  });
  public configCircle: Observable<any> = of({
    x: 200,
    y: 100,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4
  });
  start():void{

  }
}
