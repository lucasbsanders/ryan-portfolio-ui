import { AfterViewInit, Component, HostListener } from '@angular/core';
import { NavbarService } from './portfolio/services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // this.screenHeight = window.innerHeight;
    // this.screenWidth = window.innerWidth;
    this.navbarService.onResize(window.innerWidth);
  }

  constructor(private navbarService: NavbarService) {}
  ngAfterViewInit(): void {
    this.navbarService.onResize(window.innerWidth);
  }

  scrolledAtTop(isAtTop: boolean): void {
    this.navbarService.isAtTop = isAtTop;
  }
}
