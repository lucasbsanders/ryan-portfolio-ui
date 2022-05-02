import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { CollectionGroup } from 'src/app/models/CollectionGroup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public collections: CollectionGroup[] = [];

  constructor(
    private galleryService: GalleryService,
  ) { }

  ngOnInit(): void {
    this.galleryService.getAllCollections().subscribe(collections => {
      this.collections = collections;
      this.collections.forEach(collection => {
        collection.displayImage = this.getRandomImage(collection);
      })
    });
  }

  private getRandomImage(collection: CollectionGroup): string {
    if (collection.displayItems && collection.displayItems.length > 0) {
      return collection.displayItems[Math.floor(Math.random() * this.collections.length)].url;
    } else return '';
  }

}
