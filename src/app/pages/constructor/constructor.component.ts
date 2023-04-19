import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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
export class ConstructorComponent implements OnInit{
  ngOnInit() {
  }

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  canvasWidth = 800;
  canvasHeight = 600;
  elements: Element[] = [];
  draggingElementIndex: number | null = null;
  dragOffsetX = 0;
  dragOffsetY = 0;


  handleMouseDown(event: MouseEvent) {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
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
      this.draggingElementIndex = this.elements.indexOf(newElement);
      this.dragOffsetX = 0;
      this.dragOffsetY = 0;
    }
  }

  handleMouseMove(event: MouseEvent) {
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

  handleMouseUp(event: MouseEvent) {
    this.draggingElementIndex = null;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
  }

  drawElements() {
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
}
