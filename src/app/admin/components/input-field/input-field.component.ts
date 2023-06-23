import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PageEditService } from '../../services/page-edit.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent {
  @Input() tileNumber: number = -1;
  @Input() imageNumber: number = -1;
  @Input() key: string = '';
  @Input() obj: any = {};
  @Input() type: string = '';

  @ViewChild('inputRef', { read: ElementRef }) inputRef!: ElementRef;

  constructor(private pageEditService: PageEditService) {}

  changeText(key: string, event: any) {
    if (this.imageNumber > -1)
      this.updateImageField(key, event.target.value ?? '');
    else
      this.pageEditService.updateTileField(
        this.tileNumber,
        key,
        event.target.value ?? ''
      );
  }

  changeNumber(key: string, event: any) {
    console.log(event.target.value);
    if (this.imageNumber > -1)
      this.updateImageField(key, parseInt(event.target.value) || 0);
    else
      this.pageEditService.updateTileField(
        this.tileNumber,
        key,
        parseInt(event.target.value) || 0
      );
  }

  changeCheckbox(key: string, event: any) {
    if (this.imageNumber > -1)
      this.updateImageField(key, Boolean(event.target.checked));
    else
      this.pageEditService.updateTileField(
        this.tileNumber,
        key,
        Boolean(event.target.checked)
      );
  }

  changeObject(key: string, event: any) {
    var tileData = {};
    try {
      tileData = JSON.parse(event.target.value) ?? {};

      if (this.imageNumber > -1) this.updateImageField(key, tileData);
      else this.pageEditService.updateTileField(this.tileNumber, key, tileData);
    } catch (err) {
      this.styleTextarea('2px solid red');
    }
  }

  private updateImageField(key: string, value: any) {
    this.pageEditService.updateImageField(
      this.tileNumber,
      this.imageNumber,
      key,
      value
    );
  }

  styleTextarea(borderStyle?: string) {
    if (borderStyle) this.inputRef.nativeElement.style.border = borderStyle;
  }
}
