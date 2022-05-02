import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Subject, switchMap } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';
import { DisplayItem } from 'src/app/models/DisplayItem';

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
    });
  }

  public focusOnItem(focusItem: DisplayItem): void {
    this.focusItemSubject.next(focusItem);
  }

}
