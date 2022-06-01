import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  @Input() image: any = {};
  @Input() overlayVisible: boolean = false;

  private static mouseOverId: string = ''; 

  get showOverlay(): boolean {
    return this.image && this.image.link && this.overlayVisible && ImageComponent.mouseOverId === this.image.s3Key + this.image.order;
  }

  loading: boolean = true;

  constructor() {}

  setMouseOver(hover: boolean) {
    if (this.overlayVisible) {
      if (hover)
        ImageComponent.mouseOverId = this.image.s3Key + this.image.order;
      else
        ImageComponent.mouseOverId = '';
    }
  }

}
