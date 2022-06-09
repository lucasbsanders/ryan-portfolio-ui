import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PageDefault } from 'src/app/shared/classes.const';
import { iPage } from 'src/app/shared/interfaces.const';
import { PageType, TileType, Width } from '../../../shared/enums.const';
import { NavbarService } from '../../services/navbar.service';
import { PageReadService } from '../../services/page-read.service';

@Component({
  selector: 'app-page-display',
  templateUrl: './page-display.component.html',
  styleUrls: ['./page-display.component.scss'],
})
export class PageDisplayComponent implements OnInit {

  TileType = TileType;
  Width = Width;
  PageType = PageType;

  @Input() pageObs = new Observable<iPage>();
  @Input() isPreview = false;

  page: iPage = new PageDefault();
  pageNotFound = false;

  get isHomepage(): boolean {
    return this.navbarService.isHomepage;
  }

  get isSmallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }

  constructor(
    private navbarService: NavbarService,
    private pageService: PageReadService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap: any) => {
          this.page = new PageDefault();
          this.pageNotFound = false;
          const path = paramMap.get('path');

          this.navbarService.setRoute(path);
          return this.pageService.getPageByRoute(path);
        })
      )
      .subscribe((page: iPage) => this.setPage(page));

    this.pageObs.subscribe((page: iPage) => this.setPage(page));
  }

  setPage(page: iPage) {
    if (!page) this.pageNotFound = true;
    else this.page = page;
  }

}
