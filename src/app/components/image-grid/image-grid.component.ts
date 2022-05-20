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
  filterOptions: string[] = [];

  constructor(navService: NavbarService,
    router: Router) {
    super(navService, router);
  }

  ngOnInit(): void {
    this.Images.map(image => { if (image.tag) this.filterOptions.push(image.tag) });
  }

  setMouseOver(id: string): void {
    this.mouseOverId = id;
  }

}
