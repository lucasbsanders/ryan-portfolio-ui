import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
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

  constructor(
    private galleryService: GalleryService,
    private navbarService: NavbarService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.extractRouteInfo();
  }

  private extractRouteInfo(): void {
    this.navbarService.isSticky = true;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        const itemId = Guid.parse(<string>paramMap.get('id'));
        this.displayItem = this.galleryService.getItemById(itemId);

        if (!this.navbarService.endLink.includes('details')) {
          this.navbarService.locations.push({
            title: !this.displayItem.title
              ? itemId.toString().slice(0, 8) + '...'
              : this.displayItem.title,
            link: 'details/' + itemId.toString()
          });
        }
      }
    });
  }

  public focusOnItem(focusItem: DisplayItem): void {
    this.focusItemSubject.next(focusItem);
  }

}
