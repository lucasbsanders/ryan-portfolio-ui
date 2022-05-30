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

  get showOverlay(): boolean {
    return this.image && this.image.link && this.overlayVisible;
  }

  constructor(private router: Router) { }

  goToPath(path: string) {
    this.router.navigate([path]);
  }

  setMouseOver(hover: boolean) {
    if (this.showOverlay) {
      if (hover) this.image.mouseOver = true;
      else delete this.image.mouseOver;
    }
  }

}
