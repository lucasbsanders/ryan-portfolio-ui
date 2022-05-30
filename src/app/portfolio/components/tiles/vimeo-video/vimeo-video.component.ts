import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { TileBaseComponent } from '../tile-base.component';

@Component({
  selector: 'app-vimeo-video',
  templateUrl: './vimeo-video.component.html',
  styleUrls: ['./vimeo-video.component.scss'],
})
export class VimeoVideoComponent extends TileBaseComponent {

  constructor(navbarService: NavbarService, router: Router) {
    super(navbarService, router);
  }

}
