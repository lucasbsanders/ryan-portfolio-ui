import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({template: ''})
export class TileBaseComponent {

  @Input() tile: any = {};

  get colAdj(): number {
    return this.navService.colAdj;
  }

  get Images(): any[] {
    return this.tile ? this.tile.images.sort() : [];
  }

  constructor(private navService: NavbarService,
    private router: Router) { }

  goToPath(id: string) {
    this.router.navigate(['details/' + id.toString()]);
  }

}
