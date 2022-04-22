import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { ILocationLink } from 'src/app/shared/models/LocationLink';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public get locations(): ILocationLink[] {
    return this.navbarService.locations;
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
