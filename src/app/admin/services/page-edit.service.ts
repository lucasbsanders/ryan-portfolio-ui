import { Injectable } from '@angular/core';
import { Page } from 'src/app/shared/interfaces.const';

@Injectable({
  providedIn: 'root'
})
export class PageEditService {

  defaultPage = { route: '', type: '', tiles: [] };
  page: Page = this.defaultPage;

  constructor() { }

  setPageToDefault() {
    this.page = this.defaultPage;
  }


  // CRUD TILES

  getTiles(): any[] {
    return this.page.tiles ? this.page.tiles : [];
  }

  getTile(tileNum: number): any {
    const tile = this.getTiles().find(tile => tile.order === tileNum);
    return tile ? tile : {};
  }

  addTile() {
    const tiles = this.getTiles();

    tiles.push({order: tiles[tiles.length - 1].order + 1, type: 'Title', width: 'XL'});
  }

  changeTile(tileNum: number, key: string, value: any) {
    this.getTile(tileNum)[key] = value;
  }

  deleteTile(tileNum: number) {
    const tiles = this.getTiles();

    tiles.splice(tiles.findIndex((tile: any) => tile.order === tileNum), 1);

    while (tileNum < tiles.length) tiles[tileNum++].order--;
  }

  



  // CRUD IMAGES

  getImages(tileNum: number): any[] {
    const tile = this.page.tiles.find(
      (tile: any) => tile.order === tileNum
    );

    return tile && tile.images ? tile.images : [];
  }

  getImage(tileNum: number, imageNum: number): any {
    return this.getImages(tileNum) ? this.getImages(tileNum).find((img: any) => img.order === imageNum) : {};
  }

  addImage(tileNum: number) {
    const images = this.getImages(tileNum);

    images.push({order: images[images.length - 1].order + 1, s3Key: ''});
  }

  changeImage(tileNum: number, imageNum: number, key: string, value: any) {
    const images = this.getImages(tileNum);
    const image = images.find((img: any) => img.order === imageNum);

    if (value === null) delete image[key];
    else image[key] = value;
  }

  deleteImage(tileNum: number, imageNum: any) {
    const images = this.getImages(tileNum);

    images.splice(images.findIndex((img: any) => img.order === imageNum), 1);

    while (imageNum < images.length) images[imageNum++].order--;
  }
  
}
