import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PageDefault } from 'src/app/shared/classes.const';
import { TileType } from 'src/app/shared/enums.const';
import { iImage, iPage, iTile } from 'src/app/shared/interfaces.const';

@Injectable({
  providedIn: 'root',
})
export class PageEditService {

  page: iPage = new PageDefault();
  pageSubject: Subject<iPage> = new Subject<iPage>();
  pageObs: Observable<iPage> = this.pageSubject.asObservable();

  constructor() {}

  setPageToDefault() {
    this.page = new PageDefault();
  }

  update() {
    this.pageSubject.next(this.page);
  }

  // CRUD TILES

  getTiles(): iTile[] {
    return this.page.tiles
      ? this.page.tiles.sort((a: iTile, b: iTile) => a.order - b.order)
      : [];
  }

  getTile(tileNum: number): iTile | undefined {
    const tiles = this.getTiles();
    return tiles.find((tile: iTile) => tile.order === tileNum);
  }

  addTile() {
    const tiles = this.getTiles();
    console.log(tiles);
    const nextNumber =
      tiles.length > 0 ? tiles[tiles.length - 1].order + 1 : 0;

    tiles.push({
      order: nextNumber,
      type: TileType.Subtitle,
      text: '',
      images: [],
      width: 'XL',
    });

    this.update();
    console.log(this.getTiles());
  }

  changeTile(tileNum: number, key: string, value: any) {
    const tile = this.getTile(tileNum);

    if (tile) {
      if (value === null) delete tile[key];
      else tile[key] = value;
  
      this.page.tiles[tileNum] = JSON.parse(JSON.stringify(tile));
    }

    this.update();
  }

  deleteTile(tileNum: number) {
    const tiles = this.getTiles();

    tiles.splice(
      tiles.findIndex((tile: iTile) => tile.order === tileNum),
      1
    );

    while (tileNum < tiles.length) tiles[tileNum++].order--;

    this.update();
  }

  // CRUD IMAGES

  getImages(tileNum: number): iImage[] {
    const tile = this.page.tiles.find((tile: iTile) => tile.order === tileNum);

    return tile && tile.images
      ? tile.images.sort((a: iImage, b: iImage) => a.order - b.order)
      : [];
  }

  getImage(tileNum: number, imageNum: number): iImage | undefined {
    const images = this.getImages(tileNum); 
    return images.find((img: iImage) => img.order === imageNum);
  }

  addImage(tileNum: number) {
    const images = this.getImages(tileNum);
    const nextNumber =
      images.length > 0 ? images[images.length - 1].order + 1 : 0;

    images.push({ order: nextNumber, s3Key: '' });

    this.update();
  }

  changeImage(tileNum: number, imageNum: number, key: string, value: any) {
    const image = this.getImage(tileNum, imageNum);

    if (image) {
      if (value === null) delete image[key];
      else image[key] = value;
      
      const images = this.page.tiles[tileNum].images;
      if (images) {
        images[imageNum] = JSON.parse(JSON.stringify(image));
      }
    }

    this.update();
  }

  deleteImage(tileNum: number, imageNum: number) {
    const images = this.getImages(tileNum);

    images.splice(
      images.findIndex((img: iImage) => img.order === imageNum),
      1
    );

    while (imageNum < images.length) images[imageNum++].order--;

    this.update();
  }
}
