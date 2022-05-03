import { Component } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { ResourcePathsService } from 'src/app/services/resource-paths.service';

@Component({
  selector: 'app-fullscreen-menu',
  templateUrl: './fullscreen-menu.component.html',
  styleUrls: ['./fullscreen-menu.component.scss']
})
export class FullscreenMenuComponent {

  appRoutes = [
    {title: 'Services', path: '/services'},
    {title: 'Portfolio', path: '/'},
    {title: 'About Me', path: '/about'},
    {title: 'Illustrated Books', path: '/books'},
  ];

  videoReelUrl = this.resources.getConstUrls().videoReelUrl;

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  constructor(private navbarService: NavbarService,
    private resources: ResourcePathsService) { }

  close(): void {
    this.navbarService.menuOpen = false;
  }

}
