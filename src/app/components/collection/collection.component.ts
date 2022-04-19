import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CollectionGroup } from 'src/app/shared/models/CollectionGroup';
import { DisplayItem } from 'src/app/shared/models/DisplayItem';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {

  public collection: CollectionGroup = <CollectionGroup>{};
  

  constructor(
    private galleryService: GalleryService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('collection')) {
        const collectionName = <string>paramMap.get('collection');
        this.collection = this.galleryService.getCollectionByName(collectionName);
      }
    });
  }

}
