import { Component } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { ResourcePathsService } from 'src/app/services/resource-paths.service';

@Component({
  selector: 'app-fullscreen-menu',
  templateUrl: './fullscreen-menu.component.html',
  styleUrls: ['./fullscreen-menu.component.scss']
})
export class FullscreenMenuComponent {

  videoReelUrl: string;

  appRoutes = [
    {title: 'Services', path: '/services'},
    {title: 'Portfolio', path: '/'},
    {title: 'About Me', path: '/about'},
    {title: 'Illustrated Books', path: '/books'},
  ];

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  constructor(private navbarService: NavbarService,
    private resources: ResourcePathsService) {
      this.videoReelUrl = this.resources.getConstUrls().videoReelUrl;
    }

  close(): void {
    this.navbarService.menuOpen = false;
  }

}
