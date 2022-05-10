import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoNode } from 'src/app/models/Video';
import { VideoDataService } from 'src/app/services/video-data.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  private _videoNode: VideoNode = <VideoNode>{};
  private _id = '';

  get videoNode(): VideoNode {
    return this._videoNode = this.videoService.getVideoNodeById(this._id);
  }
  constructor(
    private videoService: VideoDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this._id = <string>paramMap.get('id');
    });
  }
}
