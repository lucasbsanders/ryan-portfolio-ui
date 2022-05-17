import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AwsConnectService } from 'src/app/services/aws-connect.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {

  get video(): any {
    return {title: this._id, html: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/237823870?h=c47ddc92ae&color=ffffff" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="fullscreen"></iframe></div>'}
  }

  display: any = {};
  dInput: any = { Text: '', Num: 0 };

  private _id = '';

  constructor(
    private awsService: AwsConnectService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this._id = <string>paramMap.get('id');
    });

    this.awsService.getDynamoObjectByKey('title', 'display').subscribe((data: any) => {
      this.display = data;
      this.dInput = JSON.parse(JSON.stringify(data));
    });
  }

  changeText(event: any) {
    this.dInput.Text = event.target.value;
  }

  changeNum(event: any) {
    this.dInput.Num = parseInt(event.target.value);
  }

  save() {
    this.awsService.putDynamoObjectByKey(this.dInput, 'title', 'display').subscribe(data => {
      this.display = data;
    });
  }

}
