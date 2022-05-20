import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { TileBaseComponent } from '../tile-base.component';

@Component({
  selector: 'app-text-display',
  templateUrl: './text-display.component.html',
  styleUrls: ['./text-display.component.scss']
})
export class TextDisplayComponent extends TileBaseComponent implements OnInit {

  constructor(navService: NavbarService,
    router: Router) {
    super(navService, router);
  }

  ngOnInit(): void {
  }

}
