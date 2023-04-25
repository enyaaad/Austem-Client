import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {CanvasElement} from "../../models/Element";

interface Element {
  type: 'square' | 'line' | 'rectangle';
  x: number;
  y: number;
  size?: number;
  width?: number;
  height?: number;
  color: string;
}

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.sass']
})
export class ConstructorComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  canvasWidth = 800;
  canvasHeight = 600;
  elements: Element[] = JSON.parse(localStorage.getItem('elements') || '{}');
  savedCanvases:string[] = [];
  draggingElementIndex: number | null = null;
  lastDraggedElement: number  = 0;
  dragOffsetX = 0;
  dragOffsetY = 0;
  selectedElement: string = '';
  currentShape: 'square' | 'line' | 'rectangle' = 'rectangle';

  setShape(shape: 'square' | 'line' | 'rectangle') {
    this.currentShape = shape;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.redrawCanvas()
    }, 0);
  }

  redrawCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    let lines = this.elements;
    if (ctx)
      lines.forEach(function (line) {
        switch (line.type) {
          case 'square':
            ctx.beginPath();
            ctx.strokeStyle = line.color;
            ctx.moveTo(line.x, line.y);
            ctx.fillStyle = line.color;
            if(line.size)
              ctx.fillRect(line.x, line.y, line.size, line.size);
            break;
          case 'line':
            ctx.beginPath();
            ctx.strokeStyle = line.color;
            ctx.fillStyle = line.color;
            ctx.moveTo(line.x, line.y);
            ctx.stroke();
            break;
          case 'rectangle':
            ctx.beginPath();
            ctx.strokeStyle = line.color;
            ctx.moveTo(line.x, line.y);
            ctx.fillStyle = line.color;
            if(line.height && line.width)
              ctx.fillRect(line.x, line.y, line.width, line.height);
            break;
        }
      });
  }

  handleMouseDown(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.draggingElementIndex = this.elements.findIndex(
      (element) =>
        x >= element.x &&
        x <= element.x + (element.size || element.width || 100) &&
        y >= element.y &&
        y <= element.y + (element.size || element.height || 50)
    );
    this.lastDraggedElement = this.draggingElementIndex;

    if (this.draggingElementIndex !== -1) {
      this.dragOffsetX = x - this.elements[this.draggingElementIndex].x;
      this.dragOffsetY = y - this.elements[this.draggingElementIndex].y;
    } else {
      if(ctx)
        this.switchDrawElements(ctx,this.currentShape,x,y)
      this.dragOffsetX = 0;
      this.dragOffsetY = 0;
    }
  }

  handleMouseMove(event: MouseEvent): void {
    if (this.draggingElementIndex !== null) {
      const canvas = this.canvasRef.nativeElement;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left - this.dragOffsetX;
      const y = event.clientY - rect.top - this.dragOffsetY;

      this.elements[this.draggingElementIndex].x = x;
      this.elements[this.draggingElementIndex].y = y;

      this.drawElements();
    }
  }

  handleMouseUp(event: MouseEvent): void {
    this.draggingElementIndex = null;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    localStorage.setItem('elements', JSON.stringify(this.elements))
  }

  clearCanvas(): void {
    this.elements = [];
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.setItem('elements', JSON.stringify(this.elements))

  }

  drawElements(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.elements.forEach((element) => {
        switch (element.type) {
          case 'square':
            ctx.beginPath();
            ctx.strokeStyle = element.color;
            ctx.moveTo(element.x, element.y);
            ctx.fillStyle = element.color;
            if(element.size)
              ctx.fillRect(element.x, element.y, element.size, element.size);
            break;
          case 'line':
            ctx.beginPath();
            ctx.strokeStyle = element.color;
            ctx.fillStyle = element.color;
            ctx.moveTo(element.x, element.y);
            ctx.stroke();
            break;
          case 'rectangle':
            ctx.beginPath();
            ctx.strokeStyle = element.color;
            ctx.moveTo(element.x, element.y);
            ctx.fillStyle = element.color;
            if(element.height && element.width)
              ctx.fillRect(element.x, element.y, element.width, element.height);
            break;
        }
      });
    }
  }

  randomNumberBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  saveCanvas():void{
    let currentCanvas = localStorage.getItem('elements');
    if(localStorage.getItem('elements')!=null){
      if(localStorage.getItem('elements')!.length !== 2){
        let saveName:string = Math.floor(this.randomNumberBetween(1,10000)).toString()
        this.savedCanvases.push(saveName);
        if(currentCanvas)
          localStorage.setItem(saveName,currentCanvas)
      }
    }
  }
  switchDrawElements(ctx: CanvasRenderingContext2D,type:string,x:number,y:number){
    switch (type) {
      case 'square':
        let newSquare: Element = {
          type: 'square',
          x: x,
          y: y,
          size: 50,
          color: 'blue'
        };
        this.elements.push(newSquare);
        if (ctx) {
          ctx.fillStyle = newSquare.color;
          if(newSquare.size)
            ctx.fillRect(newSquare.x, newSquare.y, newSquare.size, newSquare.size);
        }
        this.draggingElementIndex = this.elements.indexOf(newSquare);
        break;
      case 'line':
        let newLine: Element = {
          type: 'line',
          x: x,
          y: y,
          color: 'blue'
        };
        this.elements.push(newLine);
        if (ctx) {
          ctx.beginPath();
          ctx.strokeStyle = newLine.color;
          ctx.moveTo(newLine.x, newLine.y);
          ctx.lineTo(newLine.x+100, newLine.y);
          ctx.stroke();
        }
        this.draggingElementIndex = this.elements.indexOf(newLine);
        break;
      case 'rectangle':
        let newRectangle: Element = {
          type: 'rectangle',
          x: x,
          y: y,
          width: 100,
          height: 50,
          color: 'green'
        };
        this.elements.push(newRectangle);
        if (ctx) {
          ctx.fillStyle = newRectangle.color;
          if(newRectangle.height && newRectangle.width)
            ctx.fillRect(newRectangle.x, newRectangle.y, newRectangle.width, newRectangle.height);
        }
        this.draggingElementIndex = this.elements.indexOf(newRectangle);
        break;
    }
  }
  rotateElement():void{
    if (this.lastDraggedElement !== -1 ) {
      const canvas = this.canvasRef.nativeElement;
      const ctx = canvas.getContext('2d');
      if(ctx){
        switch (this.elements[this.lastDraggedElement].type){
          case 'square':
            break;
          case 'rectangle':
            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            if(this.elements[this.lastDraggedElement].width === 50){
              this.elements[this.lastDraggedElement].width = 100;
              this.elements[this.lastDraggedElement].height = 50;
            }else{
              this.elements[this.lastDraggedElement].width = 50
              this.elements[this.lastDraggedElement].height = 100;
            }
            this.redrawCanvas();
            localStorage.setItem('elements', JSON.stringify(this.elements))
            break;
          case "line":
            break;
        }
        this.redrawCanvas()
      }
    }
  }

  deleteElement():void{

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if(ctx){
      if(this.lastDraggedElement){
        this.elements.splice(this.lastDraggedElement,1)
        this.drawElements();

      }
    }
    localStorage.setItem('elements', JSON.stringify(this.elements))
    this.drawElements();

  }
}
