import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { AwsConnectService } from 'src/app/admin/services/aws-connect.service';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';
import { PageReadService } from 'src/app/portfolio/services/page-read.service';
import { PageType, TileType, Width } from 'src/app/shared/enums.const';
import { Page } from 'src/app/shared/interfaces.const';
import { environment } from 'src/environments/environment';

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

  private defaultPage = {route: '', type: '', tiles: []};
  page: Page  = this.defaultPage;

  get Tiles(): any[] {
    return this.page ? this.page.tiles.sort((a: any, b: any) => a.order - b.order) : [];
  }

  constructor(
    private navbarService: NavbarService,
    private pageService: PageReadService,
    private activatedRoute: ActivatedRoute,
    private awsService: AwsConnectService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap: any) => {
          this.page = this.defaultPage;
          this.pageNotFound = false;
          this.navbarService.setRoute(paramMap.get('path'));

          return this.pageService.getPageByRoute(paramMap.get('path'));
        })
      )
      .subscribe((page: Page) => {
        this.page = page;
        if (!this.page) this.pageNotFound = true;
      });
  }

  changeTile(tileNum: number, event: any) {
    this.page.tiles.find(tile => tile.order === tileNum)[event[0]] = event[1];
  }

  changeImage(tileNum: number, event: any) {
    const images = this.page.tiles.find((tile: any) => tile.order === tileNum).images;
    const image = images.find((img: any) => img.order === event[0]);

    if (event[2] === null)
      delete image[event[1]];
    else
      image[event[1]] = event[2];
  }

  deleteTile(tileNum: number) {
    this.page.tiles.splice(tileNum, 1);
  
    while (tileNum < this.page.tiles.length)
      this.page.tiles[tileNum++].order--;
  
    this.tilePreviewMap.clear();
  }

  removeKey(tileNum: number, key: string) {
    delete this.page.tiles.find(tile => tile.order === tileNum)[key];
  }

  moveTile(event: any) {
    const currentPos = event.target.value[0];
    const targetPos = event.target.value[1];

    const currentTile = this.page.tiles.find(
      (t: any) => t.order === currentPos
    );

    const targetTile = this.page.tiles.find(
      (t: any) => t.order === targetPos
    );

    targetTile.order = currentPos;
    currentTile.order = targetPos;
    this.tilePreviewMap.clear();
    this.scroll('EditTile' + Math.min(targetPos, currentPos));
  }

  addTile() {
    const endOrderNum = this.Tiles[this.page.tiles.length - 1].order;
  
    this.page.tiles.push({
      order: endOrderNum + 1,
      type: 'Title',
      width: 'XL'
    });

    this.scroll('EditTile' + (endOrderNum + 1));
  }

  scroll(id: string) {
    document.getElementById(id)?.scrollIntoView({behavior: "smooth", block: "start"});
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
