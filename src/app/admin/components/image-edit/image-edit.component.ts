import { Component, Input } from '@angular/core';
import { ImageDefault } from 'src/app/shared/classes.const';
import { iImage } from 'src/app/shared/interfaces.const';
import { PageEditService } from '../../services/page-edit.service';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss'],
})
export class ImageEditComponent {
  @Input() imageNumber: number = -1;
  @Input() tileNumber: number = -1;

  get Image(): iImage {
    const image = this.pageEdit.getImage(this.tileNumber, this.imageNumber);
    return image ? image : <iImage>{};
  }

  get Keys(): string[] {
    return this.Image ? Object.keys(this.Image) : [];
  }

  get ImageFieldOptions(): [string, any][] {
    return Object.entries(new ImageDefault()).filter(
      (entry) => this.Keys.findIndex((key) => key === entry[0]) === -1
    );
  }

  constructor(private pageEdit: PageEditService) {}

  typeOf(obj: any): string {
    return typeof obj;
  }

  addField(key: string, obj: any) {
    this.updateImageField(key, obj);
  }

  removeField(key: string) {
    this.updateImageField(key, null);
  }

  deleteImage() {
    this.pageEdit.deleteImage(this.tileNumber, this.Image.order);
  }

  private updateImageField(key: string, value: iImage | null) {
    this.pageEdit.updateImageField(
      this.tileNumber,
      this.Image.order,
      key,
      value
    );
  }
}
