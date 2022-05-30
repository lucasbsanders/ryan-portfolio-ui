import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { AwsConnectService } from 'src/app/admin/services/aws-connect.service';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { PageReadService } from 'src/app/portfolio/services/page-read.service';
import { PageType, TileType, Width } from 'src/app/shared/enums.const';
import { Page } from 'src/app/shared/interfaces.const';
import { environment } from 'src/environments/environment';
import { PageEditService } from '../../services/page-edit.service';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss'],
})
export class PageEditComponent implements OnInit {

  resultMessage = '';
  tilePreviewMap = new Map();

  TileType = TileType;
  Width = Width;
  PageType = PageType;

  pageNotFound = false;

  get page(): Page {
    return this.pageEdit.page;
  }

  set page(p: Page) {
    this.pageEdit.page = p;
  }

  get Tiles(): any[] {
    return this.pageEdit.getTiles();
  }

  constructor(
    private navbarService: NavbarService,
    private pageService: PageReadService,
    private activatedRoute: ActivatedRoute,
    private awsService: AwsConnectService,
    private pageEdit: PageEditService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap: any) => {
          this.pageEdit.setPageToDefault();
          this.pageNotFound = false;
          this.navbarService.setRoute(paramMap.get('path'));

          return this.pageService.getPageByRoute(paramMap.get('path'));
        })
      )
      .subscribe((page: Page) => {
        this.pageEdit.page = page;
        if (!this.page) this.pageNotFound = true;
      });
  }

  deleteTile(tileNum: number) {
    this.pageEdit.deleteTile(tileNum);
    this.tilePreviewMap.clear();
  }

  moveTile(event: any) {
    const currentPos = event.target.value[0];
    const targetPos = event.target.value[1];

    const currentTile = this.Tiles.find(
      (t: any) => t.order === currentPos
    );

    const targetTile = this.Tiles.find(
      (t: any) => t.order === targetPos
    );

    targetTile.order = currentPos;
    currentTile.order = targetPos;

    this.tilePreviewMap.clear();

    this.scroll('EditTile' + Math.min(targetPos, currentPos));
  }

  addTile() {
    this.pageEdit.addTile();
    this.scroll('EditTile' + (this.Tiles[this.Tiles.length - 1].order + 1));
  }

  scroll(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  savePage() {
    this.awsService
      .putDynamoObjectByKey(
        this.page,
        ['route', 'type'],
        [this.page.route, this.page.type],
        environment.dynamoDb.tableName
      )
      .subscribe((data) => {
        if (!data) this.setResultMessage('ERROR: Request did not succeed');
        else this.setResultMessage('Successfully saved page');
      });
  }

  deletePage() {
    this.awsService
      .deleteDynamoObjectByKey(
        ['route', 'type'],
        [this.page.route, this.page.type],
        environment.dynamoDb.tableName
      )
      .subscribe((data) => console.log(data));
  }

  private setResultMessage(msg: string) {
    this.resultMessage = msg;
    setTimeout(() => {
      this.resultMessage = '';
    }, 10000);
  }
}
