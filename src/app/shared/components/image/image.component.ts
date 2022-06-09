import { Component, Input } from '@angular/core';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
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

  get isSmallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }

  loading: boolean = true;

  constructor(private navbarService: NavbarService) {}

  loadImageOnScroll(isInView: boolean) {
    if (isInView && this.loading)
      this.loading = false;
  }

}
