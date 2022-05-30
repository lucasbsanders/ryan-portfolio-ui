import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TileBaseComponent } from 'src/app/portfolio/components/tiles/tile-base.component';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent extends TileBaseComponent {

  @Input() isSubtitle: boolean = false;

  constructor(navbarService: NavbarService,
    router: Router) {
    super(navbarService, router);
  }

}
