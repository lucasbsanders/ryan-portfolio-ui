import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { iPage, PageDefault } from 'src/app/shared/interfaces.const';
import { PageType, TileType, Width } from '../../../shared/enums.const';
import { NavbarService } from '../../services/navbar.service';
import { PageReadService } from '../../services/page-read.service';

enum PageDisplayStep {
  Loading,
  PageContent,
  NotFound,
}

@Component({
  selector: 'app-page-display',
  templateUrl: './page-display.component.html',
  styleUrls: ['./page-display.component.scss'],
})
export class PageDisplayComponent implements OnInit {
  TileType = TileType;
  Width = Width;
  PageType = PageType;
  PageDisplayStep = PageDisplayStep;

  activeStep: PageDisplayStep = PageDisplayStep.Loading;
  page: iPage = new PageDefault();

  get isHomepage(): boolean {
    return this.navbarService.isHomepage;
  }

  get isSmallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  constructor(
    private navbarService: NavbarService,
    private pageService: PageReadService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap: ParamMap) => {
          this.page = new PageDefault();
          this.activeStep = PageDisplayStep.Loading;
          const path = paramMap.get('route');

          this.navbarService.setRoute(path ?? '');
          return this.pageService.getPageFromRoute(path);
        })
      )
      .subscribe((page: iPage | undefined) => {
        if (page) {
          this.page = page;
          this.activeStep = PageDisplayStep.PageContent;
          setTimeout(
            () => window.scrollTo({ top: 0, behavior: 'smooth' }),
            300
          );
        } else {
          this.activeStep = PageDisplayStep.NotFound;
        }
      });
  }
}
