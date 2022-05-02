import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { switchMap } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';
import { CollectionGroup } from 'src/app/models/CollectionGroup';

const smallPopTrigger = trigger('smallPop', [
  state('tiny',
    style({
      transform: 'scale(.7)',
    })
  ),
  state('small',
    style({
      transform: 'scale(.8)',
    })
  ),
  state('medium',
    style({
      transform: 'scale(.9)',
    })
  ),
  state('large',
    style({
      transform: 'scale(1)',
    })
  ),

  transition('* <=> *', [animate('.2s')]),
]);

@Component({
  selector: 'app-slideshow',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  animations: [smallPopTrigger],
})
export class CollectionComponent implements OnInit {

  public collection: CollectionGroup = <CollectionGroup>{};
  public mouseOverId: Guid = Guid.createEmpty();
  public focusId: Guid = Guid.createEmpty();
  public isActive: Map<Guid, boolean> = new Map<Guid, boolean>();
  public isVisible: Map<Guid, boolean> = new Map<Guid, boolean>();
  public imgRatio: Map<Guid, string> = new Map<Guid, string>();

  constructor(
    private galleryService: GalleryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap(paramMap => {
        const collectionName = <string>paramMap.get('collection');
        return this.galleryService.getCollectionByName(collectionName);
      })
    ).subscribe(collection => {
      if (!collection) this.router.navigate(['error']);
      else {
        this.collection = collection;
        this.collection.displayItems.forEach(item => {
          this.imgRatio.set(item.id, 'tiny');
        });
      }
    });
  }

  mouseOver(id: Guid, event: any) {
    this.mouseOverId = id;
  }

  mouseOut(id: Guid) {
    this.mouseOverId = Guid.createEmpty();
  }

  imageLoad(id: Guid) {
    this.isActive.set(id, !this.isActive.get(id));
  }

  setVisible(isVisible: any, id: Guid) {
    this.isVisible.set(id, isVisible);
  }

  setRatio(ratio: any, id: Guid) {
    var ratioLabel = '';
    if (ratio < .1) {
      ratioLabel = 'tiny';
    } else if (ratio < .2) {
      ratioLabel = 'small';
    } else if (ratio < .3) {
      ratioLabel = 'medium';
    } else {
      ratioLabel = 'large';
    }
    this.imgRatio.set(id, ratioLabel);
  }


}
