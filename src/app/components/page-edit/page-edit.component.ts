import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AwsConnectService } from 'src/app/services/aws-connect.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { PageReadService } from 'src/app/services/page-read.service';
import { environment } from 'src/environments/environment';
import { PageDisplayComponent } from '../page-display/page-display.component';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss'],
})
export class PageEditComponent extends PageDisplayComponent implements OnInit {

  resultMessage = '';
  tilePreviewMap = new Map();

  constructor(
    navbarService: NavbarService,
    pageService: PageReadService,
    activatedRoute: ActivatedRoute,
    private awsService: AwsConnectService
  ) {
    super(navbarService, pageService, activatedRoute);
  }

  changeTile(tile: any, event: any) {
    tile[event[0]] = event[1];
  }

  deleteTile(tile: any) {
    var deleteElement = this.page.tiles.findIndex((t: { order: any; }) => t.order === tile.order);
    this.page.tiles.splice(deleteElement, 1);
    while (deleteElement < this.page.tiles.length) {
      this.page.tiles[deleteElement++].order--;
    }
    this.tilePreviewMap.clear();
  }

  removeKey(tile: any, key: string) {
    delete tile[key];
  }

  moveTile(tile: any, adjust: number) {
    const currentPos = tile.order;
    const targetPos = currentPos + adjust;

    const targetTile = this.page.tiles.find(
      (t: any) => t.order === targetPos
    );

    targetTile.order = currentPos;
    tile.order = targetPos;
    this.tilePreviewMap.clear();
  }

  addTile() {
    const endOrderNum =
      this.page.tiles[this.page.tiles.length - 1].order;
    this.page.tiles.push({ order: endOrderNum + 1, type: '' });
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
