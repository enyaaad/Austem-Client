import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {CalculatorService} from "../../services/calculator.service";

interface Element {
  type: 'square' | 'line' | 'rectangle';
  x: number;
  y: number;
  size?: number;
  width?: number;
  height?: number;
  color: string;
  direction?: string;
}

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.sass']
})
export class ConstructorComponent implements AfterViewInit {
  private draggingElementIndex: number | null = null;
  private lastDraggedElement: number = 0;
  private dragOffsetX: number = 0;
  private dragOffsetY: number = 0;
  private currentShape: 'square' | 'line' | 'rectangle' = 'square';


  protected canvasWidth: number = 800;
  protected canvasHeight: number = 600;
  protected elements: Element[] = JSON.parse(localStorage.getItem('elements') || '{}') || {};
  protected savedCanvases: string[] = [];
  protected projectName: string = '';

  protected selectedElement: string = '';
  protected pipeLength: string = '';
  protected pipeType: 'blue' | 'red' = 'blue';
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  protected setShape(shape: 'square' | 'line' | 'rectangle'): void {
    this.currentShape = shape;
    switch (shape) {
      case "square":
        this.selectedElement = "boiler";
        break;
      case "rectangle":
        this.selectedElement = "radiator";
        break
      case "line":
        this.selectedElement = "pipe"
        break
    }
  }

  protected switchPipeType(type: 'blue' | 'red'): void {
    switch (type) {
      case "blue":
        this.pipeType = "red";
        break
      case "red":
        this.pipeType = "blue";
        break
    }
  }

  constructor(private cookieService: CookieService, public router: Router, public calc: CalculatorService) {
    if (!cookieService.check('token'))
      this.router.navigate(['mainpage']);
    if (this.cookieService.get('projectName'))
      this.projectName = this.cookieService.get('projectName')
    else {
      this.projectName = 'New';
      this.elements = [];
      localStorage.setItem('elements', JSON.stringify(this.elements))
    }

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setShape("square");
      this.redrawCanvas()
    }, 0);
  }

  protected redrawCanvas(): void {
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
            if (line.size)
              ctx.fillRect(line.x, line.y, line.size, line.size);
            break;
          case 'line':
            ctx.beginPath();
            ctx.strokeStyle = line.color;
            ctx.moveTo(line.x, line.y);
            ctx.fillStyle = line.color;
            if (line.height && line.width)
              ctx.fillRect(line.x, line.y, line.width, line.height);
            break;
          case 'rectangle':
            ctx.beginPath();
            ctx.strokeStyle = line.color;
            ctx.moveTo(line.x, line.y);
            ctx.fillStyle = line.color;
            if (line.height && line.width)
              ctx.fillRect(line.x, line.y, line.width, line.height);
            break;
        }
      });
  }

  protected handleMouseDown(event: MouseEvent): void {
    if (event.button == 0) {
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

        if (ctx)
          this.switchDrawElements(ctx, this.currentShape, x, y)
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
      }
    }
  }

  protected handleMouseMove(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left - this.dragOffsetX;
    const y = event.clientY - rect.top - this.dragOffsetY;

    if (this.draggingElementIndex !== null) {
      this.elements[this.draggingElementIndex].x = x;
      this.elements[this.draggingElementIndex].y = y;
    }
    this.drawElements();

  }

  protected handleMouseUp(event: MouseEvent): void {
    this.draggingElementIndex = null;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    localStorage.setItem('elements', JSON.stringify(this.elements))
  }

  protected clearCanvas(): void {
    this.elements = [];
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.setItem('elements', JSON.stringify(this.elements))

  }

  private drawElements(): void {
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
            if (element.size)
              ctx.fillRect(element.x, element.y, element.size, element.size);
            break;
          case 'line':
            ctx.beginPath();
            ctx.strokeStyle = element.color;
            ctx.moveTo(element.x, element.y);
            ctx.fillStyle = element.color;
            if (element.height && element.width)
              ctx.fillRect(element.x, element.y, element.width, element.height);
            break;
          case 'rectangle':
            ctx.beginPath();
            ctx.strokeStyle = element.color;
            ctx.moveTo(element.x, element.y);
            ctx.fillStyle = element.color;
            if (element.height && element.width)
              ctx.fillRect(element.x, element.y, element.width, element.height);
            break;
        }
      });
    }
  }

  public saveCanvas(): void {
    let currentCanvas = localStorage.getItem('elements');
    if (this.cookieService.check('projectName')) {
      let items = {...localStorage};
      for (let itemsKey in items) {
        if (itemsKey.includes(this.cookieService.get('projectName'))) {
          if (currentCanvas)
            localStorage.setItem(this.cookieService.get('projectName'), currentCanvas);
        } else {
          if (currentCanvas)
            localStorage.setItem(this.cookieService.get('projectName'), currentCanvas);
        }
      }
    } else {
      if (localStorage.getItem('elements') != null) {
        if (localStorage.getItem('elements')!.length !== 2) {
          let saveName: string = Math.floor(this.calc.randomNumberBetween(1, 10000)).toString()
          this.savedCanvases.push(saveName);
          if (currentCanvas)
            localStorage.setItem(saveName, currentCanvas)
        }
      }
    }
  }

  private switchDrawElements(ctx: CanvasRenderingContext2D, type: string, x: number, y: number) {
    let pipeLen = '100';
    if (this.pipeLength != '') {
      if (this.pipeLength && parseInt(this.pipeLength) <= 100)
        pipeLen = this.pipeLength
    }
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
          if (newSquare.size)
            ctx.fillRect(newSquare.x, newSquare.y, newSquare.size, newSquare.size);
        }
        this.draggingElementIndex = this.elements.indexOf(newSquare);
        break;
      case 'line':
        let newLine: Element = {
          type: 'line',
          x: x,
          y: y,
          width: parseInt(pipeLen),
          height: 10,
          color: this.pipeType,
        };
        this.elements.push(newLine);
        if (ctx) {
          ctx.fillStyle = newLine.color;
          if (newLine.height && newLine.width)
            ctx.fillRect(newLine.x, newLine.y, newLine.width, newLine.height);
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
          if (newRectangle.height && newRectangle.width)
            ctx.fillRect(newRectangle.x, newRectangle.y, newRectangle.width, newRectangle.height);
        }
        this.draggingElementIndex = this.elements.indexOf(newRectangle);
        break;
    }
  }

  protected rotateElement(): void {
    console.log(this.elements[this.lastDraggedElement]);
    if (this.elements.length > 0)
      if (this.lastDraggedElement !== -1) {
        const canvas = this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          switch (this.elements[this.lastDraggedElement].type) {
            case 'square':
              break;
            case 'rectangle':
              ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
              if (this.elements[this.lastDraggedElement].width === 50) {
                this.elements[this.lastDraggedElement].width = 100;
                this.elements[this.lastDraggedElement].height = 50;
              } else {
                this.elements[this.lastDraggedElement].width = 50
                this.elements[this.lastDraggedElement].height = 100;
              }
              this.redrawCanvas();
              localStorage.setItem('elements', JSON.stringify(this.elements))
              break;
            case "line":
              ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
              let tempw = this.elements[this.lastDraggedElement].width;
              let temph = this.elements[this.lastDraggedElement].height;
              this.elements[this.lastDraggedElement].width = temph;
              this.elements[this.lastDraggedElement].height = tempw;
              this.redrawCanvas();
              localStorage.setItem('elements', JSON.stringify(this.elements))
              break;
          }
          this.redrawCanvas()
        }
      }
  }

  protected deleteElement(): void {
    console.log(this.lastDraggedElement)
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (this.lastDraggedElement || this.lastDraggedElement == 0) {
        this.elements = this.elements.filter((value, index) => {
          return index !== this.lastDraggedElement
        })
        this.drawElements();
        this.lastDraggedElement = -1;

      }
    }
    localStorage.setItem('elements', JSON.stringify(this.elements))
    this.drawElements();
  }

  protected newProject(): void {
    if (localStorage.getItem('elements') != null) {
      if (localStorage.getItem('elements')!.length !== 2) {
        let saveName: string = Math.floor(this.calc.randomNumberBetween(1, 10000)).toString()
        this.projectName = saveName
        this.cookieService.set('projectName', saveName)
      }
    }
    this.clearCanvas()
  }
}
