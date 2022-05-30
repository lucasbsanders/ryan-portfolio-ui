import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Width } from '../../../shared/enums.const';
import { NavbarService } from '../../services/navbar.service';

@Component({template: ''})
export class TileBaseComponent {

  Width = Width;

  @Input() tile: any = {};

  get colAdjSm(): number {
    return this.navbarService.isSmallScreen ? -1 : 0;
  }

  get colAdjMd(): number {
    return this.navbarService.isMediumScreen ? -1 : 0;
  }

  get isSmall(): boolean {
    return this.navbarService.isSmallScreen;
  }

  get isMedium(): boolean {
    return this.navbarService.isMediumScreen;
  }

  get Images(): any[] {
    return this.tile && this.tile.images ?
      this.tile.images.sort((a: any, b: any) => a.order - b.order) : [];
  }

  constructor(protected navbarService: NavbarService,
    protected router: Router) { }

  goToPath(route: string) {
    this.router.navigate([route]);
  }

}
