import { Component, Input, OnInit } from '@angular/core';
import { TileDefault } from 'src/app/shared/classes.const';
import { TileType, Width } from 'src/app/shared/enums.const';
import { iImage, iTile } from 'src/app/shared/interfaces.const';
import { PageEditService } from '../../services/page-edit.service';

@Component({
  selector: 'app-tile-edit',
  templateUrl: './tile-edit.component.html',
  styleUrls: ['./tile-edit.component.scss'],
})
export class TileEditComponent {
  @Input() tileNumber: number = -1;

  get Images(): iImage[] {
    return this.pageEditService.getImages(this.tileNumber);
  }

  get Keys(): string[] {
    const keys = Object.keys(this.Tile);
    return keys ? keys : [];
  }

  get Tile(): iTile {
    const tile = this.pageEditService.getTile(this.tileNumber);
    return tile ? tile : <iTile>{};
  }

  get TileTypeValues(): string[] {
    return Object.values(TileType);
  }

  get WidthTypeValues(): string[] {
    return Object.values(Width);
  }

  get TileFieldOptions(): [string, any][] {
    return Object.entries(new TileDefault()).filter(
      (entry) => this.Keys.findIndex((key) => key === entry[0]) === -1
    );
  }

  constructor(private pageEditService: PageEditService) {}

  typeOf(obj: any): string {
    return typeof obj;
  }

  addField(key: string, obj: any) {
    this.pageEditService.updateTileField(this.tileNumber, key, obj);
  }

  removeTileKey(key: string) {
    this.pageEditService.updateTileField(this.tileNumber, key, null);
  }

  changeText(key: string, event: any) {
    this.pageEditService.updateTileField(
      this.tileNumber,
      key,
      event.target.value
    );
  }

  addImage() {
    this.pageEditService.addImage(this.tileNumber);
  }

  moveImage(event: any) {
    const currentPos = event[0];
    const targetPos = event[1];

    const currentImg = this.pageEditService.getImage(
      this.tileNumber,
      currentPos
    );
    const targetImg = this.pageEditService.getImage(this.tileNumber, targetPos);

    if (currentImg && targetImg) {
      currentImg.order = targetPos;
      targetImg.order = currentPos;

      this.pageEditService.update();
    }
  }
}
