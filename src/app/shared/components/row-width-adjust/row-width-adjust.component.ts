import { Component, Input } from '@angular/core';
import { Width } from 'src/app/shared/enums.const';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';

@Component({
  selector: 'app-row-width-adjust',
  templateUrl: './row-width-adjust.component.html',
  styleUrls: ['./row-width-adjust.component.scss'],
})
export class RowWidthAdjustComponent {
  @Input() width = '';

  Width = Width;

  get isMedium(): boolean {
    return this.navbarService.isMediumScreen;
  }

  constructor(private navbarService: NavbarService) {}
}
