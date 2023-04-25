import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

interface Element {
  x: number;
  y: number;
  size: number;
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
  dragOffsetX = 0;
  dragOffsetY = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.redrawCanvas()
    }, 0.5);
  }

  redrawCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    let lines = this.elements;
    if (ctx)
      lines.forEach(function (line: { x: any, y: any, size: number, color: string }) {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.moveTo(line.x, line.y);
        ctx.fillStyle = line.color;
        ctx.fillRect(line.x, line.y, line.size, line.size);
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
        x <= element.x + element.size &&
        y >= element.y &&
        y <= element.y + element.size
    );

    if (this.draggingElementIndex !== -1) {
      this.dragOffsetX = x - this.elements[this.draggingElementIndex].x;
      this.dragOffsetY = y - this.elements[this.draggingElementIndex].y;
    } else {
      const newElement: Element = {
        x,
        y,
        size: 50,
        color: 'red'
      };
      this.elements.push(newElement);
      if (ctx) {
        ctx.fillStyle = newElement.color;
        ctx.fillRect(newElement.x, newElement.y, newElement.size, newElement.size);
      }
      this.draggingElementIndex = this.elements.indexOf(newElement);
      this.dragOffsetX = 0;
      this.dragOffsetY = 0;
    }
    console.log(this.draggingElementIndex)
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
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x, element.y, element.size, element.size);
      });
    }
  }
  randomNumberBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  saveCanvas():void{
    let currentCanvas = localStorage.getItem('elements');
    let saveName:string = 'Project ' + Math.floor(this.randomNumberBetween(1,10000))
    this.savedCanvases.push(saveName);
    if(currentCanvas)
      localStorage.setItem(saveName,currentCanvas)
  }
}
