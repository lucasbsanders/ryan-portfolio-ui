import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { Width } from 'src/app/services/pages.const';
import { TileBaseComponent } from '../../helpers/tile-base.component';

@Component({
  selector: 'app-text-display',
  templateUrl: './text-display.component.html',
  styleUrls: ['./text-display.component.scss']
})
export class TextDisplayComponent extends TileBaseComponent {

  constructor(navbarService: NavbarService,
    router: Router) {
    super(navbarService, router);
  }

}
