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
export class PageEditComponent
  extends PageDisplayComponent
  implements OnInit, AfterViewInit
{

  displayPage: any = {};
  invalidJson = false;
  resultMessage = '';

  get pageJson(): string {
    return JSON.stringify(this.page, null, 2);
  }

  constructor(
    navbarService: NavbarService,
    pageService: PageReadService,
    activatedRoute: ActivatedRoute,
    private awsService: AwsConnectService
  ) {
    super(navbarService, pageService, activatedRoute);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.adjustTextareaHeight(), 500);
  }

  input(event: any) {
    this.adjustTextareaHeight();
    try {
      this.displayPage = JSON.parse(event.target.value);

      this.invalidJson = false;
    } catch (err) {
      this.invalidJson = true;
    }
  }

  savePage() {
    this.awsService
      .putDynamoObjectByKey(
        this.displayPage,
        'route',
        this.displayPage.route,
        environment.dynamoDb.tableName
      )
      .subscribe((data) => {
        if (!data)
          this.setResultMessage('ERROR: Request did not succeed');
        else
          this.setResultMessage('Successfully saved page');
      });
  }

  deletePage() {
    this.awsService
      .deleteDynamoObjectByKey(
        'route',
        this.displayPage.route,
        environment.dynamoDb.tableName
      )
      .subscribe((data) => console.log(data));
  }

  private adjustTextareaHeight() {
    this.pageNotFound = false;
    const element = document.querySelector('textarea');
    if (element) {
      element.style.height = '0';
      element.style.height = (element.scrollHeight + 10) + 'px';
    }
  }

  private setResultMessage(msg: string) {
    this.resultMessage = msg;
    setTimeout(() => {
      this.resultMessage = '';
    }, 8000);
  }
}
