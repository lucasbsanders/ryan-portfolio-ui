import { Component, Input } from '@angular/core';
import { ImageDefault } from '../../classes.const';
import { iImage } from '../../interfaces.const';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  @Input() image: iImage = new ImageDefault();
  @Input() overlayVisible: boolean = false;
  @Input() scaleImageHover: boolean = false;

  get showOverlay(): boolean {
    return this.image && !(!this.image.link) && this.overlayVisible;
  }

  loading: boolean = true;

  constructor() {}

  loadImageOnScroll(isInView: boolean) {
    if (isInView && this.loading)
      this.loading = false;
  }

}
