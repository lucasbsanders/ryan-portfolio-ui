import { Component, Input } from '@angular/core';
import { ImageDefault } from 'src/app/shared/classes.const';
import { PageEditService } from '../../services/page-edit.service';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss'],
})
export class ImageEditComponent {

  @Input() imageNumber: number = -1;
  @Input() tileNumber: number = -1;

  get Image() {
    return this.pageEdit.getImage(this.tileNumber, this.imageNumber);
  }

  get Keys(): string[] {
    return this.Image ? Object.keys(this.Image) : [];
  }

  get ImageFieldOptions(): any[] {
    return Object.entries(new ImageDefault()).filter(
      (entry) => this.Keys.findIndex((key) => key === entry[0]) === -1
    );
  }

  constructor(private pageEdit: PageEditService) {}

  addField(key: string, obj: any) {
    this.changeImage(key, obj);
  }

  removeField(key: string) {
    this.changeImage(key, null);
  }

  deleteImage() {
    this.pageEdit.deleteImage(this.tileNumber, this.Image.order);
  }

  private changeImage(key: string, value: any) {
    this.pageEdit.changeImage(this.tileNumber, this.Image.order, key, value);
  }
}
