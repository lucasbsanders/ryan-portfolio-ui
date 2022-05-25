import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AwsConnectService } from 'src/app/services/aws-connect.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { PageReadService } from 'src/app/services/page-read.service';
import { PageDisplayComponent } from '../page-display/page-display.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss'],
})
export class PageEditComponent extends PageDisplayComponent implements OnInit {
  invalidJson = false;
  resultMessage = '';
  displayPage: any = {};

  constructor(
    navbarService: NavbarService,
    pageService: PageReadService,
    activatedRoute: ActivatedRoute,
    private awsService: AwsConnectService
  ) {
    super(navbarService, pageService, activatedRoute);
  }

  json(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  changeTile(event: any) {
    try {
      const tile = JSON.parse(event.target.value);
      this.displayPage = this.page;
      this.displayPage.tiles = this.page.tiles.filter(
        (t: { order: any }) => t.order !== tile.order
      );
      this.displayPage.tiles.push(tile);
      console.log(event.target.style);
      event.target.style.border = '3px solid lime';
    } catch (err) {
      event.target.style.border = '3px solid red';
    }
  }

  moveTile(tile: any, adj: number) {
    const currentPos = tile.order;
    const targetPos = currentPos + adj;

    this.displayPage = this.page;
    const targetTile = this.displayPage.tiles.find(
      (t: { order: any }) => t.order === targetPos
    );
    targetTile.order = currentPos;
    tile.order = targetPos;

    this.displayPage.tiles = this.page.tiles.filter(
      (t: { order: any }) => t.order !== currentPos && t.order !== targetPos
    );
    this.displayPage.tiles.push(tile);
    this.displayPage.tiles.push(targetTile);
  }

  savePage() {
    this.awsService
      .putDynamoObjectByKey(
        this.page,
        'route',
        this.page.route,
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
        'route',
        this.page.route,
        environment.dynamoDb.tableName
      )
      .subscribe((data) => console.log(data));
  }

  private setResultMessage(msg: string) {
    this.resultMessage = msg;
    setTimeout(() => {
      this.resultMessage = '';
    }, 8000);
  }
}
