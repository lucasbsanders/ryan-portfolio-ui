import { Component } from '@angular/core';
import { NavbarService } from './portfolio/services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private navbarService: NavbarService) {}

  scrolledAtTop(isAtTop: any): void {
    this.navbarService.isAtTop = isAtTop;
  }

}
