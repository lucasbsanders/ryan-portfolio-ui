import { Component } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { LocalResourceService } from 'src/app/services/local-resource.service';
import { Router } from '@angular/router';

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
    private resourceService: LocalResourceService,
    private router: Router) {
      this.videoReelUrl = this.resourceService.getConstUrls().videoReelUrl;
    }

  closeMenu(): void {
    this.navbarService.menuOpen = false;
  }

  goToPath(path: string) {
    this.router.navigate([path]);
    this.closeMenu();
  }

}
