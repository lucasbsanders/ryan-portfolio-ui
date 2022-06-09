import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { iImage } from 'src/app/shared/interfaces.const';
import { TileBaseComponent } from '../tile-base.component';

@Component({
  selector: 'app-image-subtitle',
  templateUrl: './image-subtitle.component.html',
  styleUrls: ['./image-subtitle.component.scss'],
})
export class ImageSubtitleComponent extends TileBaseComponent {

  get Image(): iImage {
    return this.images[0] ? this.images[0] : <iImage>{};
  }

  constructor(navbarService: NavbarService, router: Router) {
    super(navbarService, router);
  }

}
