import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { switchMap } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { CollectionGroup } from 'src/app/shared/models/CollectionGroup';

@Component({
  selector: 'app-slideshow',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {

  public collection: CollectionGroup = <CollectionGroup>{};
  public mouseOverId: Guid = Guid.createEmpty();

  constructor(
    private galleryService: GalleryService,
    private navbarService: NavbarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.navbarService.locations = [];

    this.activatedRoute.paramMap.pipe(
      switchMap(paramMap => {
        const collectionName = <string>paramMap.get('collection');
        return this.galleryService.getCollectionByName(collectionName);
      })
    ).subscribe(collection => {
      this.collection = collection;
      this.setNavbarLocations(this.collection.title);
    });
  }

  private setNavbarLocations(title: string) {
    this.navbarService.isSticky = false;
    this.navbarService.locations = [{title: title, link: title}];
  }

  mouseOver(id: Guid, event: any) {
    this.mouseOverId = id;
  }

  mouseOut(id: Guid) {
    this.mouseOverId = Guid.createEmpty();
  }

}
