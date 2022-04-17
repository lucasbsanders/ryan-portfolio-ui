import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public collections: string[] = [];

  constructor(
    private galleryService: GalleryService,
  ) { }

  ngOnInit(): void {
    this.collections = this.galleryService.getAllCollectionNames();
  }

}
