import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { TileBaseComponent } from '../tile-base.component';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent extends TileBaseComponent {

  filterOptions: string[] = ['All', 'Illustration', 'Animation', 'UX/UI'];
  selectedFilter: string = 'All';

  get adjustedColumns(): number {
    return this.tile.columns ? this.tile.columns + this.colAdjSm : 1;
  }

  override get Images(): any[] {
    return this.tile && this.tile.images ? this.tile.images
      .sort((a: any, b: any) => a.order - b.order)
      .filter((img: any) => this.selectedFilter.localeCompare('All')===0 || (img.tags &&
        img.tags.filter((t: string) => t === this.selectedFilter).length > 0))
        : [];
  }

  constructor(navbarService: NavbarService,
    router: Router) {
    super(navbarService, router);
  }

  filterItems(filter: string): void {
    this.selectedFilter = filter;
  }

}
