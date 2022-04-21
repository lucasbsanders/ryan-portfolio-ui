import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Subject, switchMap } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { DisplayItem } from 'src/app/shared/models/DisplayItem';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss'],
})
export class ImageDetailsComponent implements OnInit {

  public displayItem: DisplayItem = <DisplayItem>{};
  public focusItemSubject = new Subject<DisplayItem>();
  public focusItemObservable = this.focusItemSubject.asObservable();

  private galleryName: string = '';

  constructor(
    private galleryService: GalleryService,
    private navbarService: NavbarService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.extractRouteInfo();
  }

  private extractRouteInfo(): void {

    this.activatedRoute.paramMap.pipe(
      switchMap(paramMap => {
        const itemId = Guid.parse(<string>paramMap.get('id'));
        this.galleryName = paramMap.has('gallery') ? <string>paramMap.get('gallery') : '';
        return this.galleryService.getItemById(itemId);
      })
    ).subscribe(displayItem => {
      this.displayItem = displayItem;
      this.setNavbarLocations(this.displayItem.title, this.displayItem.id.toString());
    });
  }

  private setNavbarLocations(title: string, id: string) {
    this.navbarService.isSticky = true;
    if (!this.navbarService.endLink.includes('details')) {
      if (this.navbarService.locations.length == 0 && this.galleryName !== '') {
        this.navbarService.locations.push({
          title: this.galleryName,
          link: this.galleryName
        });
      }
      this.navbarService.locations.push({
        title: title ? title : id.slice(0, 8) + '...',
        link: 'details/' + id
      });
    }
  }

  public focusOnItem(focusItem: DisplayItem): void {
    this.focusItemSubject.next(focusItem);
  }

}
