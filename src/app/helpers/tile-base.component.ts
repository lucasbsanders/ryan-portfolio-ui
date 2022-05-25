import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Width } from '../services/pages.const';

@Component({template: ''})
export class TileBaseComponent {

  Width = Width;

  @Input() tile: any = {};

  get colAdj(): number {
    return this.navbarService.colAdj;
  }

  get isSmall(): boolean {
    return this.navbarService.colAdj < 0;
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
