import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({template: ''})
export class TileBaseComponent {

  @Input() tile: any = {};

  get colAdj(): number {
    return this.navbarService.colAdj;
  }

  get Images(): any[] {
    return this.tile && this.tile.images ?
      this.tile.images.sort((a: any, b: any) => a.order - b.order) : [];
  }

  constructor(private navbarService: NavbarService,
    private router: Router) { }

  goToPath(route: string) {
    this.router.navigate([route]);
  }

}
