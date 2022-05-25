import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { Width } from 'src/app/services/pages.const';
import { TileBaseComponent } from '../../helpers/tile-base.component';

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
