import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { resources } from 'src/app/shared/LocalData/BrandData';

@Component({
  selector: 'app-fullscreen-menu',
  templateUrl: './fullscreen-menu.component.html',
  styleUrls: ['./fullscreen-menu.component.scss']
})
export class FullscreenMenuComponent implements OnInit {

  appRoutes = [
    {title: 'Services', path: '/services'},
    {title: 'Portfolio', path: '/'},
    {title: 'About Me', path: '/about'},
    {title: 'Illustrated Books', path: '/books'},
  ];

  videoReelUrl = resources.videoReelUrl;

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
  }

  close(): void {
    this.navbarService.menuOpen = false;
  }

}
