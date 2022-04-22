import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { ILocationLink } from 'src/app/shared/models/LocationLink';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

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

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    if (this.isSticky) {
      document.getElementById('navbar')?.classList.add("sticky-top");
    }
  }

}
