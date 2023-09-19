import { Component } from '@angular/core';
import { TileBaseComponent } from '../tile-base.component';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.scss'],
})
export class YoutubeVideoComponent extends TileBaseComponent {
  loading: boolean = true;

  constructor(navbarService: NavbarService, router: Router) {
    super(navbarService, router);
  }
}
