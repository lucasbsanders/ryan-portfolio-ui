import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { TileBaseComponent } from '../tile-base.component';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent extends TileBaseComponent implements OnInit, OnChanges {

  filterOptions: string[] = ['All', 'Illustration', 'Animation', 'UX/UI'];
  selectedFilter: string = 'All';

  sortedFilteredImages: any[] = [];

  get adjustedColumns(): number {
    return this.tile.columns ? this.tile.columns + this.colAdjSm : 1;
  }

  constructor(navbarService: NavbarService,
    router: Router) {
    super(navbarService, router);
  }

  override ngOnInit(): void {
    this.sortedFilteredImages = this.sortFilterImages(this.selectedFilter);
  }

  override ngOnChanges(changes: SimpleChanges): void  {
    this.sortedFilteredImages = this.sortFilterImages(this.selectedFilter);
  }

  filterItems(filter: string): void {
    this.selectedFilter = filter;
    this.sortedFilteredImages = this.sortFilterImages(filter);
  }

  private sortFilterImages(filter: string): any[] {
    return this.getSortedImages()
      .filter((img: any) => filter === 'All' || (img.tags && img.tags.includes(filter)));
  }

}
