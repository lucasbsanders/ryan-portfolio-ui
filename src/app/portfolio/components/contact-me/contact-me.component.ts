import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { TileType, Width } from 'src/app/shared/enums.const';
import { iTile } from 'src/app/shared/interfaces.const';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
})
export class ContactMeComponent {
  Width = Width;
  contactPageWidth = Width.M;

  titleTile: iTile = {
    order: 0,
    type: TileType.Title,
    text: 'Contact Me',
    center: true,
  };

  constructor(private navbarService: NavbarService) {}

  get isSmallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }
}
