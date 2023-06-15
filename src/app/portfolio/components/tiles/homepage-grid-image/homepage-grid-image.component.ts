import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { TileBaseComponent } from '../tile-base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage-grid-image',
  templateUrl: './homepage-grid-image.component.html',
  styleUrls: ['./homepage-grid-image.component.scss'],
})
export class HomepageGridImageComponent extends TileBaseComponent {
  constructor(navbarService: NavbarService, router: Router) {
    super(navbarService, router);
  }
}
