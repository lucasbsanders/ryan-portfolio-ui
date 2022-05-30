import { Component, Input } from '@angular/core';
import { PageEditService } from '../../services/page-edit.service';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss'],
})
export class ImageEditComponent {

  @Input() imageNumber: number = 0;
  @Input() tileNumber: number = 0;

  newFieldName = '';

  get Image() {
    return this.pageEdit.getImage(this.tileNumber, this.imageNumber);
  }

  get Keys(): string[] {
    return this.Image ? Object.keys(this.Image) : [];
  }

  constructor(private pageEdit: PageEditService) {}

  typeOf(obj: any): string {
    return typeof obj;
  }

  setNewFieldName(event: any) {
    this.newFieldName = event.target.value;
  }

  addField(obj: any) {
    this.changeImage(this.newFieldName, obj);
    this.newFieldName = '';
  }
  
  changeImageText(key: string, event: any) {
    this.changeImage(key, event.target.value);
  }

  changeImageNumber(key: string, event: any) {
    this.changeImage(key, parseInt(event.target.value));
  }

  changeImageCheckbox(key: string, event: any) {
    this.changeImage(key, event.target.checked);
  }

  removeField(key: string) {
    this.changeImage(key, null)
  }

  deleteImage() {
    this.pageEdit.deleteImage(this.tileNumber, this.Image.order);
  }

  private changeImage(key: string, value: any) {
    this.pageEdit.changeImage(this.tileNumber, this.Image.order, key, value);
  }

}
