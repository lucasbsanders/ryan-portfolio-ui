import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Guid } from 'guid-typescript';
import { DisplayItem } from '../../shared/models/DisplayItem';

const squarePreviewTrigger = trigger('squarePreview', [
  state('square',
    style({
      transform: 'scale(1)',
      objectFit: 'cover',
      //opacity: 1,
    })
  ),

  state('preview',
    style({
      transform: 'scale(1.3)',
      objectFit: 'contain',
      zIndex: 9,
      //opacity: 0,
    })
  ),

  transition('square <=> preview', [animate('0.5s ease-in-out')]),
]);

@Component({
  selector: 'app-image-square',
  templateUrl: './image-square.component.html',
  styleUrls: ['./image-square.component.scss'],
  animations: [squarePreviewTrigger],
})
export class ImageSquareComponent implements OnInit {
  @Input() displayItem: DisplayItem = <DisplayItem>{};
  @Input() mouseOverId: Guid = Guid.createEmpty();
  @ViewChild('canvas', { static: true }) canvas:
    | ElementRef<HTMLCanvasElement>
    | undefined;

  private ctx: CanvasRenderingContext2D | null | undefined;

  public get isHovered(): boolean {
    if (this.displayItem.id === this.mouseOverId && this.canvas)
      this.canvas.nativeElement.height *= 1.5;
    return this.displayItem.id === this.mouseOverId;
  }

  constructor() {}

  ngOnInit(): void {
    if (this.canvas) {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      var img = new Image();
      img.src = this.displayItem.url;
  
      img.onload = () => {
        if (this.canvas && this.ctx) {
          var wRatio = this.canvas.nativeElement.width / img.width;
          var hRatio = this.canvas.nativeElement.height / img.height;
          var ratio = Math.min(wRatio, hRatio);
          var startx = (this.canvas.nativeElement.width - img.width * ratio) / 2;
          var starty = (this.canvas.nativeElement.height - img.height * ratio) / 2;
          var widthx = img.width * ratio;
          var widthy = img.height * ratio;
          this.ctx.drawImage(img, startx, starty, widthx, widthy);
        }
      };
    }
    
  }
}
