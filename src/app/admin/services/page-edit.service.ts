import { Injectable } from '@angular/core';
import { PageDefault } from 'src/app/shared/classes.const';
import { TileType, Width } from 'src/app/shared/enums.const';
import { iImage, iPage, iTile } from 'src/app/shared/interfaces.const';

@Injectable({
  providedIn: 'root',
})
export class PageEditService {
  page: iPage = new PageDefault();

  constructor() {}

  setPageToDefault() {
    this.page = new PageDefault();
  }

  update() {
    this.page = {
      ...this.page,
      tiles: [
        ...this.page.tiles.map((tile: iTile) =>
          tile.images
            ? {
                ...tile,
                images: [...tile.images],
              }
            : { ...tile }
        ),
      ],
    };

    this.page.tiles.sort((a: iTile, b: iTile) => a.order - b.order);
    this.page.tiles.forEach((tile: iTile) =>
      tile.images?.sort((a: iImage, b: iImage) => a.order - b.order)
    );
  }

  // CRUD TILES

  getTile(tileNum: number): iTile | undefined {
    return this.page.tiles.find((tile: iTile) => tile.order === tileNum);
  }

  addTxtTile() {
    const tiles = this.page.tiles;

    const nextNumber = tiles.length > 0 ? tiles[tiles.length - 1].order + 1 : 0;

    tiles.push({
      order: nextNumber,
      type: TileType.Text,
      text: `<p class="x-large">Skills</p>
<col>
<p>Brand strategy</p>
<p>Art direction</p>
<p>Illustration</p>
<p>Graphic design</p>
<p>2D Animation</p>`,
      width: Width.M,
    });

    this.update();
  }

  addImgTile() {
    const tiles = this.page.tiles;

    const nextNumber = tiles.length > 0 ? tiles[tiles.length - 1].order + 1 : 0;

    tiles.push({
      order: nextNumber,
      type: TileType.ImageGrid,
      images: [<iImage>{ order: 0, s3Key: '' }],
      width: Width.M,
    });

    this.update();
  }

  updateTileField(tileNum: number, key: string, value: any) {
    const tile = this.getTile(tileNum);

    if (tile) {
      if (value === null) delete tile[key];
      else tile[key] = JSON.parse(JSON.stringify(value));

      this.page.tiles[tileNum] = tile;
    }

    this.update();
  }

  deleteTile(tileNum: number) {
    const tiles = this.page.tiles;

    tiles.splice(
      tiles.findIndex((tile: iTile) => tile.order === tileNum),
      1
    );

    while (tileNum < tiles.length) tiles[tileNum++].order--;

    this.update();
  }

  // CRUD IMAGES

  getImages(tileNum: number): iImage[] {
    const tile = this.getTile(tileNum);
    return tile ? tile.images ?? [] : [];
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

  updateImageField(tileNum: number, imageNum: number, key: string, value: any) {
    const image = this.getImage(tileNum, imageNum);

    if (image) {
      if (value === null) delete image[key];
      else image[key] = JSON.parse(JSON.stringify(value));

      const images = this.getImages(tileNum);
      if (images && images.length > imageNum) {
        images[imageNum] = image;
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
