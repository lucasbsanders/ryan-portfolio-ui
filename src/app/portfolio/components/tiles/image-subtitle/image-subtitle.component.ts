import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { SubtitleStyle } from 'src/app/shared/enums.const';
import { TileBaseComponent } from '../tile-base.component';

@Component({
  selector: 'app-image-subtitle',
  templateUrl: './image-subtitle.component.html',
  styleUrls: ['./image-subtitle.component.scss'],
})
export class ImageSubtitleComponent extends TileBaseComponent {

  SubtitleStyle = SubtitleStyle;

  constructor(navbarService: NavbarService, router: Router) {
    super(navbarService, router);
  }

}
