import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PageDefault } from 'src/app/shared/classes.const';
import { TileType } from 'src/app/shared/enums.const';
import { iPage } from 'src/app/shared/interfaces.const';

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
    this.page = JSON.parse(JSON.stringify(this.page));
    this.pageSubject.next(this.page);
  }

  // CRUD TILES

  getTiles(): any[] {
    return this.page.tiles
      ? this.page.tiles.sort((a: any, b: any) => a.order - b.order)
      : [];
  }

  getTile(tileNum: number): any {
    const tile = this.getTiles().find((tile) => tile.order === tileNum);
    return tile ? tile : {};
  }

  addTile() {
    const tiles = this.getTiles();

    tiles.push({
      order: tiles[tiles.length - 1].order + 1,
      type: TileType.Subtitle,
      text: '',
      images: [],
      width: 'XL',
    });

    this.update();
  }

  changeTile(tileNum: number, key: string, value: any) {
    const tile = this.getTile(tileNum);

    if (value === null) delete tile[key];
    else tile[key] = value;

    this.update();
  }

  deleteTile(tileNum: number) {
    const tiles = this.getTiles();

    tiles.splice(
      tiles.findIndex((tile: any) => tile.order === tileNum),
      1
    );

    while (tileNum < tiles.length) tiles[tileNum++].order--;

    this.update();
  }

  // CRUD IMAGES

  getImages(tileNum: number): any[] {
    const tile = this.page.tiles.find((tile: any) => tile.order === tileNum);

    return tile && tile.images
      ? tile.images.sort((a: any, b: any) => a.order - b.order)
      : [];
  }

  getImage(tileNum: number, imageNum: number): any {
    return this.getImages(tileNum)
      ? this.getImages(tileNum).find((img: any) => img.order === imageNum)
      : {};
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

    if (value === null) delete image[key];
    else image[key] = value;

    this.update();
  }

  deleteImage(tileNum: number, imageNum: any) {
    const images = this.getImages(tileNum);

    images.splice(
      images.findIndex((img: any) => img.order === imageNum),
      1
    );

    while (imageNum < images.length) images[imageNum++].order--;

    this.update();
  }
}
