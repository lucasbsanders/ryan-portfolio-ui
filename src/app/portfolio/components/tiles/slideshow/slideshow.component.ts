import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { TileBaseComponent } from '../tile-base.component';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent
  extends TileBaseComponent
  implements AfterViewInit
{
  constructor(navbarService: NavbarService, router: Router) {
    super(navbarService, router);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.activateSlideshow(), 300);
  }

  private activateSlideshow() {
    document
      .getElementById('book' + this.tile.order + 'btn0')
      ?.classList.add('active');
    document
      .getElementById('book' + this.tile.order + 'page0')
      ?.classList.add('active');
  }
}
