import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { GalleryService } from 'src/app/services/gallery.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { CollectionGroup } from 'src/app/shared/models/CollectionGroup';

const imageShrinkTrigger = trigger('squarePreview', [
  state('square', style({
    transform: 'scale(1)'
  })),
  
  state('preview', style({
    transform: 'scale(1.2)'
  })),
  
  transition('square <=> preview', [
    animate('0.5s ease-in-out')
  ]),
]);

@Component({
  selector: 'app-slideshow',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  animations: [
    imageShrinkTrigger,
  ],
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
    this.navbarService.isSticky = false;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.navbarService.locations = [];
      if (paramMap.has('collection')) {
        const collectionName = <string>paramMap.get('collection');
        this.collection = this.galleryService.getCollectionByName(collectionName);
        this.navbarService.locations = [{title: collectionName, link: collectionName}];
      }
    });
  }

  mouseOver(id: Guid, event: any) {
    this.mouseOverId = id;
  }

  mouseOut(id: Guid) {
    this.mouseOverId = Guid.createEmpty();
  }

}
