import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
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
  editPanelOpenMap = new Map();
  buttonDisable = false;

  get page(): iPage {
    return this.pageEditService.page;
  }

  get Tiles(): iTile[] {
    return this.pageEditService.page.tiles;
  }

  constructor(
    private navbarService: NavbarService,
    private pageReadService: PageReadService,
    private activatedRoute: ActivatedRoute,
    private awsService: AdminAPIService,
    private pageEditService: PageEditService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (environment.disableEdit) this.router.navigate(['/']);
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap: any) => {
          this.pageEditService.setPageToDefault();
          this.pageNotFound = false;
          this.route = paramMap.get('path');
          this.navbarService.setRoute(this.route);

          return this.pageReadService.getPageFromRoute(this.route);
        })
      )
      .subscribe((page: iPage | null) => {
        if (!page) this.pageNotFound = true;
        else this.pageEditService.page = page;
      });
  }

  deleteTile(tileNum: number) {
    this.buttonDisable = true;
    this.pageEditService.deleteTile(tileNum);
    this.editPanelOpenMap.clear();
    this.buttonDisable = false;
  }

  moveTile(event: number[]) {
    this.buttonDisable = true;

    const [currentPos, targetPos] = event;

    const currentTile = this.pageEditService.getTile(currentPos);
    const targetTile = this.pageEditService.getTile(targetPos);

    if (currentTile && targetTile) {
      currentTile.order = targetPos;
      targetTile.order = currentPos;

      this.editPanelOpenMap.clear();

      this.scroll('tile-scroll-id-' + targetPos);

      this.pageEditService.update();
    }
    this.buttonDisable = false;
  }

  addTxtTile() {
    this.buttonDisable = true;

    this.pageEditService.addTxtTile();
    this.scroll('tile-scroll-id-' + (this.Tiles.length - 1));
    this.editPanelOpenMap.set(this.Tiles.length - 1, true);
  }

  addImgTile() {
    this.buttonDisable = true;

    this.pageEditService.addImgTile();
    this.scroll('tile-scroll-id-' + (this.Tiles.length - 1));
    this.editPanelOpenMap.set(this.Tiles.length - 1, true);
  }

  saveTile(order: number) {
    this.savePage();
    this.editPanelOpenMap.delete(order);
  }

  scrollToPreview() {
    this.scroll('preview');
  }

  scroll(id: string) {
    this.buttonDisable = true;

    setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.buttonDisable = false;
    }, 300);
  }

  editComponent(order: number) {
    this.editPanelOpenMap.set(order, true);
  }

  savePage() {
    this.buttonDisable = true;
    this.awsService.createOrEditPage(this.page).subscribe((data) => {
      if (!data) this.setErrorMessage('ERROR: Request did not succeed');
      else this.setSuccessMessage('Successfully saved page');
      this.buttonDisable = false;
    });
  }

  deletePage() {
    this.buttonDisable = true;
    try {
      this.awsService.deletePage(this.page).subscribe((data) => {
        this.setSuccessMessage(JSON.stringify(data));
        this.buttonDisable = false;
      });
    } catch (err: string | any) {
      this.setErrorMessage(err);
      this.buttonDisable = false;
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
