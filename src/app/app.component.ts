import { AfterViewInit, Component } from '@angular/core';
import { NavbarService } from './portfolio/services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor(private navbarService: NavbarService) {}

  scrolledAtTop(isAtTop: boolean): void {
    this.navbarService.isAtTop = isAtTop;
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  onResize() {
    this.navbarService.onResize(window.outerWidth);
  }
}
