import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Width } from '../../../shared/enums.const';
import { NavbarService } from '../../services/navbar.service';

@Component({template: ''})
export class TileBaseComponent implements OnInit, OnChanges {

  Width = Width;

  @Input() tile: any = {};

  images: any[] = [];

  get colAdjSm(): number {
    return this.navbarService.isSmallScreen ? -1 : 0;
  }

  get colAdjMd(): number {
    return this.navbarService.isMediumScreen ? -1 : 0;
  }

  get isSmall(): boolean {
    return this.navbarService.isSmallScreen;
  }

  get isSmallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }

  get isMediumScreen(): boolean {
    return this.navbarService.isMediumScreen;
  }

  constructor(protected navbarService: NavbarService,
    protected router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.images = this.getSortedImages();
  }

  ngOnInit(): void {
    this.images = this.getSortedImages();
  }

  getSortedImages(): any[] {
    return this.tile && this.tile.images ?
      this.tile.images.sort((a: any, b: any) => a.order - b.order) : [];
  }

  goToPath(route: string) {
    this.router.navigate([route]);
  }

}
