import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { navbarBrandLinks } from 'src/app/shared/localData/ImageData';
import { ILocationLink } from 'src/app/shared/models/LocationLink';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

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

  public get isSticky(): boolean {
    return this.navbarService.isSticky;
  }

  navbarLinks: any;
  navLinkSelection: string = 'dark';

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    if (this.isSticky) {
      document.getElementById('navbar')?.classList.add("sticky-top");
    }
    this.navbarLinks = navbarBrandLinks;
  }



}
