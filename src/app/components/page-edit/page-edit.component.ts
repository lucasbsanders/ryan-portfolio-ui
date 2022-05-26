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

  override ngOnInit(): void {
    super.ngOnInit();
    setTimeout(() => {
      this.setAllHeights();
    }, 1000);
  }

  private setAllHeights() {
    const elements = document.getElementsByTagName('textarea');
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.height = '0px';
      elements[i].style.height = (elements[i].scrollHeight + 5) + 'px';
    }
  }

  json(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  changeTile(event: any) {
    if (!this.displayPage || !this.displayPage.tiles) {
      this.displayPage = this.page;
    }
    this.setAllHeights();

    event.target.style.height = '0px';
    event.target.style.height = (event.target.scrollHeight + 5) + 'px';

    try {
      const tileData = JSON.parse(event.target.value);
      const displayTile =
        this.displayPage.tiles[
          this.displayPage.tiles.findIndex(
            (t: { order: any }) => t.order === tileData.order
          )
        ];

      Object.keys(displayTile).forEach((key) => delete displayTile[key]);
      Object.keys(tileData).forEach(
        (key) => (displayTile[key] = tileData[key])
      );

      event.target.style.border = '3px solid lime';
    } catch (err) {
      event.target.style.border = '3px solid red';
    }
  }

  moveTile(tile: any, adjust: number) {
    if (!this.displayPage || !this.displayPage.tiles) {
      this.displayPage = this.page;
    }
    this.setAllHeights();

    const currentPos = tile.order;
    const targetPos = currentPos + adjust;

    const targetTile = this.displayPage.tiles.find(
      (t: any) => t.order === targetPos
    );

    targetTile.order = currentPos;
    tile.order = targetPos;
  }

  addTile() {
    if (!this.displayPage || !this.displayPage.tiles) {
      this.displayPage = this.page;
    }
    this.setAllHeights();

    const endOrderNum =
      this.displayPage.tiles[this.displayPage.tiles.length - 1].order;
    this.displayPage.tiles.push({ order: endOrderNum + 1 });
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
