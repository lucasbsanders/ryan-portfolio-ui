import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { TileBaseComponent } from '../tile-base.component';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
})
export class ImageGridComponent
  extends TileBaseComponent
  implements OnInit, OnChanges
{
  selectedFilter: string =
    this.tile.filters && this.tile.filters.length > 0
      ? this.tile.filters[0]
      : 'All';
  sortedFilteredImages: any[] = [];

  get adjustedColumns(): number {
    return this.tile.columns ? this.tile.columns + this.colAdjSm : 1;
  }

  constructor(navbarService: NavbarService, router: Router) {
    super(navbarService, router);
  }

  override ngOnInit(): void {
    this.sortedFilteredImages = this.sortFilterImages(this.selectedFilter);
  }

  override ngOnChanges(changes: SimpleChanges): void {
    this.sortedFilteredImages = this.sortFilterImages(this.selectedFilter);
  }

  filterItems(filter: string): void {
    this.selectedFilter = filter;
    this.sortedFilteredImages = this.sortFilterImages(filter);
  }

  lastRowColOffset(rowLen: number, index: number): string {
    const colWidth = Math.ceil(12 / this.adjustedColumns);

    if (rowLen === this.adjustedColumns) return `col-${colWidth}`;
    else {
      const offsetWidth =
        index === 0 ? Math.floor(6 - (colWidth * rowLen) / 2) : 0;
      return `col-${colWidth} offset-${offsetWidth}`;
    }
  }

  private sortFilterImages(filter: string): any[] {
    return this.getSortedImages().filter(
      (img: any) => filter === 'All' || (img.tags && img.tags.includes(filter))
    );
  }
}
