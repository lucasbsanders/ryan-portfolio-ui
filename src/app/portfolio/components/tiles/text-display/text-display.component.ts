import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { TileBaseComponent } from '../tile-base.component';

@Component({
  selector: 'app-text-display',
  templateUrl: './text-display.component.html',
  styleUrls: ['./text-display.component.scss']
})
export class TextDisplayComponent extends TileBaseComponent {

  get adjustedColumns(): number {
    return this.tile.columns ? this.tile.columns + this.colAdjMd : 1;
  }

  constructor(navbarService: NavbarService,
    router: Router) {
    super(navbarService, router);
  }

}
