import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { VideoNode, Video } from '../models/Video';

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const ids = [
  Guid.parse('1f008265-0060-90c2-9886-db413743450c'),
  Guid.parse('addf3a8e-ff67-6e41-9bab-2df8132afddf'),
  Guid.parse('8e2e352e-6dfb-96e0-d2b7-0ed7557ac99d'),
  Guid.parse('fc479543-3c58-4454-f880-08dfd2f39d3c'),
  Guid.parse('c0059b29-1327-0d4d-346e-53a5011b154a'),
  Guid.parse('2994d115-cf4a-88b2-a707-7e3b43892688'),
  Guid.parse('abce9136-1ce0-e9ca-b192-269fe6f789c1'),
  Guid.parse('4fda8de2-0119-4a3d-0788-caa5dcd11951'),
  Guid.parse('e7ab69da-a6b7-83d7-ffb2-da50c2ab7534'),
];

const testVideos = [
  '<div style="padding:54.17% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/701028600?h=64c6a6d2e6" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/237823870?h=c47ddc92ae&color=ffffff" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/672680672?h=1b547c1751&title=0&byline=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/283927789?h=fecd8dddf8" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/283927789?h=fecd8dddf8" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
];

@Injectable({
  providedIn: 'root',
})
export class VideoDataService {

  private videoNodeList: VideoNode[] = [];
  private videoById: Map<string, VideoNode> = new Map();

  constructor() {
    this.buildVideoContainers();
    for (let node of this.videoNodeList) {
      console.log(node.video.id.toString());
      console.log(this.getVideoNodeById(node.video.id.toString()));
    }
  }

  getVideoReelHtml(): string {
    return <string>this.videoNodeList[0].video.html;
  }

  getAllVideoPreviews(): any[] {
    return this.videoNodeList
    .sort((a, b) => a.video.sortOrder - b.video.sortOrder )
    .map((videoNode) => {
      return { 
        id: videoNode.video.id,
        title: videoNode.video.title,
        preview: videoNode.video.preview
      };
    });
  }

  getVideoNodeById(id: string): VideoNode {
    return <VideoNode>this.videoById.get(id);
  }

  private buildVideoContainers(): void {
    var node = <VideoNode>{};
    for (var i = 0; i < testVideos.length; i++) {
      node.video = <Video>{
        id: ids[i],
        html: testVideos[i],
        title: 'A Really Really Long Title',
        sortOrder: i,
        client: 'assets/RyanFennessey_logo_black.svg',
        preview: 'assets/RyanFennessey_logo_black.svg',
        storyPieces: [text],
        process: [
          ['assets/RyanFennessey_logo_black.svg', text],
          ['assets/RyanFennessey_logo_white.svg', text],
        ],
      };
      this.videoNodeList.push(node);
      this.videoById.set(node.video.id.toString(), node);
      if ((i +  1) < testVideos.length) {
        node.next = <VideoNode>{
          previous: node,
        };
        node = node.next;
      }
    }
  }
}
