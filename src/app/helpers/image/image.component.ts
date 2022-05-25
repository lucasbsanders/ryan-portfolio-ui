import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  @Input() image: any = {};
  @Input() overlay = false;

  get showOverlay(): boolean {
    return this.image && this.image.mouseOver && this.image.link && this.overlay;
  }

  constructor(private navbarService: NavbarService,
    private router: Router) { }

  goToPath(path: string) {
    this.navbarService.menuOpen = false;
    this.router.navigate([path]);
  }

  out() {
    this.image.mouseOver=false;
  }

}
