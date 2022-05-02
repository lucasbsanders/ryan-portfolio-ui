import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DisplayItem } from 'src/app/models/DisplayItem';

@Component({
  selector: 'app-image-fullscreen',
  templateUrl: './image-fullscreen.component.html',
  styleUrls: ['./image-fullscreen.component.scss']
})
export class ImageFullscreenComponent implements OnInit {

  @Input() focusItemObservable = new Observable<DisplayItem>();
  @Input() displayItem: DisplayItem = <DisplayItem>{};
  public isDisplayed = false;
  //public displayItem: DisplayItem = <DisplayItem>{};

  public get displayStyle(): string {
    return this.isDisplayed ? 'block' : 'none';
  }

  constructor() { }

  ngOnInit(): void {
    document.body.style.overflowY = this.isDisplayed ? 'hidden' : 'auto';
    this.focusItemObservable.subscribe(displayItem => {
      // this.displayItem = displayItem;
      this.viewFullscreen(true);
    });
  }

  public viewFullscreen(isOpen: boolean): void {
    this.isDisplayed = isOpen;
    document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
  }

}
