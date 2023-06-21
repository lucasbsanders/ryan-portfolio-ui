import { Component, Input } from '@angular/core';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { ImageDefault } from '../../classes.const';
import { iImage } from '../../interfaces.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() image: iImage = new ImageDefault();
  @Input() className: string = '';
  @Input() enableOverlay: boolean = false;
  @Input() scaleImageOnHover: boolean = false;

  get showOverlay(): boolean {
    return Boolean(this.image?.link) && this.enableOverlay;
  }

  get isSmallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }

  loading: boolean = true;

  constructor(private navbarService: NavbarService, private router: Router) {}

  loadImageOnScroll(isInView: boolean) {
    if (isInView && this.loading) this.loading = false;
  }

  goToImageRoute(route: string) {
    this.router.navigate([route]);
  }
}
