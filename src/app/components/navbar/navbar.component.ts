import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { navbarResources } from 'src/app/shared/localData/ImageData';
import { ILocationLink } from 'src/app/shared/models/LocationLink';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  clickMenuButton(): void {
    const temp = this.navbarLinks.dark;
    this.navbarLinks.dark = this.navbarLinks.light;
    this.navbarLinks.light = temp;
    this.navbarService.menuOpen = !this.navbarService.menuOpen;
  }

  public get env(): string {
    return environment.production ? '' : ' (local)';
  }

  private contactLink = <ILocationLink>{
    title: 'Contact',
    link: '/contact',
  };

  private categoriesLink = <ILocationLink>{
    title: 'Categories',
    link: '/',
  };

  public get locations(): ILocationLink[] {
    const locations = [this.contactLink, this.categoriesLink];
    if (this.navbarService.locations && this.navbarService.locations.length > 0)
      locations.push({
        title: 'Locations',
        dropdownLinks: this.navbarService.locations,
      });
    return locations;
  }

  navbarLinks: any;
  navLinkSelection: string = 'dark';

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarLinks = navbarResources;
  }



}
