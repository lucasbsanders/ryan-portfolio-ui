import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AdminAPIService } from 'src/app/admin/services/api-connect.service';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { PageReadService } from 'src/app/portfolio/services/page-read.service';
import { PageType, TileType, Width } from 'src/app/shared/enums.const';
import { iPage, iTile } from 'src/app/shared/interfaces.const';
import { environment } from 'src/environments/environment';
import { PageEditService } from '../../services/page-edit.service';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss'],
})
export class PageEditComponent implements OnInit {

  TileType = TileType;
  Width = Width;
  PageType = PageType;

  route = '';
  successMessage = '';
  errorMessage = '';
  pageNotFound = false;
  tilePreviewMap = new Map();

  get page(): iPage {
    return this.pageEdit.page;
  }

  get pageObs(): Observable<iPage> {
    return this.pageEdit.pageObs;
  }

  get Tiles(): iTile[] {
    return this.pageEdit.getTiles();
  }

  constructor(
    private navbarService: NavbarService,
    private pageService: PageReadService,
    private activatedRoute: ActivatedRoute,
    private awsService: AdminAPIService,
    private pageEdit: PageEditService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (environment.disableEdit)
      this.router.navigate(['/']);
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap: any) => {
          this.pageEdit.setPageToDefault();
          this.pageNotFound = false;
          this.route = paramMap.get('path');
          this.navbarService.setRoute(this.route);

          return this.pageService.getPageFromRoute(this.route);
        })
      )
      .subscribe((page: iPage | null) => {
        if (!page) this.pageNotFound = true;
        else this.pageEdit.page = page;
      });
  }

  deleteTile(tileNum: number) {
    this.pageEdit.deleteTile(tileNum);
    this.tilePreviewMap.clear();
  }

  moveTile(event: number[]) {
    const currentPos = event[0];
    const targetPos = event[1];

    const currentTile = this.pageEdit.getTile(currentPos);
    const targetTile = this.pageEdit.getTile(targetPos);

    if (currentTile && targetTile) {
      currentTile.order = targetPos;
      targetTile.order = currentPos;
  
      this.tilePreviewMap.clear();
  
      this.scroll('EditTile' + targetPos);
  
      this.pageEdit.update();
    }
  }

  addTile() {
    this.pageEdit.addTile();
    this.scroll('EditTile' + (this.Tiles.length - 1));
  }

  scroll(id: string) {
    setTimeout(
      () =>
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      300
    );
  }

  savePage() {
    this.awsService.createOrEditPage(this.page)
    .subscribe((data) => {
      if (!data) this.setErrorMessage('ERROR: Request did not succeed');
      else this.setSuccessMessage('Successfully saved page');
    });
  }

  deletePage() {
    try {
      this.awsService.deletePage(this.page)
      .subscribe((data) => this.setSuccessMessage(JSON.stringify(data)));
    }
    catch (err: string | any) {
      this.setErrorMessage(err);
    }
    
  }

  private setSuccessMessage(msg: string) {
    this.successMessage = msg;
    setTimeout(() => {
      this.successMessage = '';
    }, 10000);
  }

  private setErrorMessage(msg: string) {
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = '';
    }, 10000);
  }
}
