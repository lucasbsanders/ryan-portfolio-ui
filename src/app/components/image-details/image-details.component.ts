import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { GalleryService } from 'src/app/services/gallery.service';
import { DisplayItem } from 'src/app/shared/models/DisplayItem';
import { ILocationLink } from 'src/app/shared/models/LocationLink';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss'],
})
export class ImageDetailsComponent implements OnInit {

  public displayItem: DisplayItem = <DisplayItem>{};
  public collectionName = '';
  public location: ILocationLink[] = [];

  constructor(
    protected galleryService: GalleryService,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.extractRouteInfo();
  }

  private extractRouteInfo(): void {
    this._route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        const itemId = Guid.parse(<string>paramMap.get('id'));
        this.displayItem = this.galleryService.getItemById(itemId);

        this.location.push({
          title: !this.displayItem.title
            ? itemId.toString().slice(0, 6) + '...'
            : this.displayItem.title,
          link: 'details/' + itemId.toString(),
        });
      }
    });

    this._route.queryParamMap.subscribe((queryParamMap) => {
      if (queryParamMap.has('collection')) {
        this.collectionName = <string>queryParamMap.get('collection');

        this.location.unshift({
          title: this.collectionName,
        });
      }
    });
  }

}
