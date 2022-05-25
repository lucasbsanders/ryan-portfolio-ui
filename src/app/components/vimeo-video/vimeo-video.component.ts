import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { TileBaseComponent } from '../../helpers/tile-base.component';

@Component({
  selector: 'app-vimeo-video',
  templateUrl: './vimeo-video.component.html',
  styleUrls: ['./vimeo-video.component.scss'],
})
export class VimeoVideoComponent extends TileBaseComponent implements OnInit {

  constructor(navbarService: NavbarService, router: Router) {
    super(navbarService, router);
  }

  ngOnInit(): void {}
}
