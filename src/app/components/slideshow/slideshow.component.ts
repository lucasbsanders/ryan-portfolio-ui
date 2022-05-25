import { AfterViewChecked, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { Width } from 'src/app/services/pages.const';
import { TileBaseComponent } from '../../helpers/tile-base.component';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent extends TileBaseComponent implements AfterViewChecked {

  constructor(navbarService: NavbarService,
    router: Router) {
    super(navbarService, router);
  }

  ngAfterViewChecked(): void {
    this.activateSlideshows();
  }

  private activateSlideshows() {
    document.getElementById('book' + this.tile.order + 'btn0')?.classList.add('active');
    document.getElementById('book' + this.tile.order + 'page0')?.classList.add('active');
  }

}
