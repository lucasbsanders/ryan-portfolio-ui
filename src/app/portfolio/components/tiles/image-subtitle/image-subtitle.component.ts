import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { TileBaseComponent } from '../tile-base.component';

export enum SubtitleStyle {
  Left = 'Left',
  Bottom = 'Bottom',
}

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
