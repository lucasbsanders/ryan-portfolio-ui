import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { Width } from 'src/app/services/pages.const';
import { TileBaseComponent } from '../../helpers/tile-base.component';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent extends TileBaseComponent {

  filterOptions = ['All', 'Illustration', 'Animation', 'UX/UI'];
  selectedFilter = 'All';

  override get Images(): any[] {
    return this.tile && this.tile.images ? this.tile.images
      .sort((a: any, b: any) => a.order - b.order)
      .filter((img: any) => this.selectedFilter.localeCompare('All')===0 || (img.tags &&
        img.tags.find((t: string) => t.localeCompare(this.selectedFilter) === 0).length > 0))
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
