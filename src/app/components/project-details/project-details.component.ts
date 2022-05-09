import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { VideoNode } from 'src/app/models/Video';
import { VideoDataService } from 'src/app/services/video-data.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  public videoNode: VideoNode = <VideoNode>{};

  constructor(
    private videoService: VideoDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = <string>paramMap.get('id');
      this.videoNode = this.videoService.getVideoNodeById(id);
    });
  }
}
