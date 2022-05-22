import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { TileBaseComponent } from '../tile-base.component';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent extends TileBaseComponent implements OnInit {

  mouseOverId = '';
  filterOptions = ['All', 'Illustration', 'Animation', 'UX/UI'];
  selectedFilter = 'All';

  override get Images(): any[] {
    return this.tile.images
      .sort((a: any, b: any) => a.order - b.order)
      .filter((img: any) => this.selectedFilter === 'All' || (img.tags &&
        img.tags.find((t: string) => t.localeCompare(this.selectedFilter) === 0).length > 0));
  }

  constructor(navbarService: NavbarService,
    router: Router) {
    super(navbarService, router);
  }

  ngOnInit(): void {}

  setMouseOver(id: string): void {
    this.mouseOverId = id;
  }

  filterItems(filter: string): void {
    this.selectedFilter = filter;
  }

}
