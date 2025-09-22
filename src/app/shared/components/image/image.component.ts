import { Component, Input } from '@angular/core';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { ImageDefault } from '../../interfaces.const';
import { iImage } from '../../interfaces.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  private readonly MOBILE_TOUCH_DELAY_MS = 0.5 * 1000;

  @Input() image: iImage = new ImageDefault();
  @Input() animateImageAppearance = true;
  @Input() hasShadow: boolean = false;
  @Input() className?: string;

  loading: boolean = true;
  mouseIn: boolean = false;

  get isSmallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }

  constructor(private navbarService: NavbarService, private router: Router) {}

  mouseMove() {
    this.mouseIn = true;
  }

  loadImageOnScroll(isInView: boolean) {
    if (isInView && this.loading) this.loading = false;
  }

  conditionalGoToImageRoute() {
    if (this.image.url || this.image.link)
      this.router.navigate(['/' + (this.image.url ?? this.image.link)]);
  }

}
