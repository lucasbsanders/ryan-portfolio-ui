import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { PageDefault } from 'src/app/shared/classes.const';
import { iPage } from 'src/app/shared/interfaces.const';
import { PageType, TileType, Width } from '../../../shared/enums.const';
import { NavbarService } from '../../services/navbar.service';
import { PageReadService } from '../../services/page-read.service';
import { AUTHORIZED_KEY } from 'src/app/shared/functions/cache-functions';

@Component({
  selector: 'app-page-display',
  templateUrl: './page-display.component.html',
  styleUrls: ['./page-display.component.scss'],
})
export class PageDisplayComponent implements OnInit {
  TileType = TileType;
  Width = Width;
  PageType = PageType;

  page: iPage = new PageDefault();

  pageNotFound = false;

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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userIsAuth = localStorage.getItem(AUTHORIZED_KEY) === 't';

    if (!userIsAuth) {
      this.router.navigate(['/']);
    } else {
      this.activatedRoute.paramMap
        .pipe(
          switchMap((paramMap: any) => {
            this.page = new PageDefault();
            this.pageNotFound = false;
            const path = paramMap.get('route');

            this.navbarService.setRoute(path);
            return this.pageService.getPageFromRoute(path);
          })
        )
        .subscribe((page: iPage | null) => this.setPage(page));
    }
  }

  setPage(page: iPage | null) {
    if (!page) this.pageNotFound = true;
    else this.page = page;

    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 300);
  }
}
