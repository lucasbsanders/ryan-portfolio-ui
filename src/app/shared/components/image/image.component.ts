import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  @Input() image: any = {};
  @Input() overlayVisible = false;

  private static mouseOverId = ''; 

  get showOverlay(): boolean {
    return this.image && this.image.link && this.overlayVisible && ImageComponent.mouseOverId === this.image.s3Key + this.image.order;
  }

  constructor() { }

  setMouseOver(hover: boolean) {
    if (this.overlayVisible) {
      if (hover)
        ImageComponent.mouseOverId = this.image.s3Key + this.image.order;
      else
        ImageComponent.mouseOverId = '';
    }
  }

}
