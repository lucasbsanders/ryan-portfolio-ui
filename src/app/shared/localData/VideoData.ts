import { Video, VideoNode } from "src/app/models/video";
import { resources, videoProcess } from "./BrandData";
import { Guid } from "guid-typescript";

const ids = [
  Guid.parse("1f008265-0060-90c2-9886-db413743450c"),
  Guid.parse("addf3a8e-ff67-6e41-9bab-2df8132afddf"),
  Guid.parse("8e2e352e-6dfb-96e0-d2b7-0ed7557ac99d"),
  Guid.parse("fc479543-3c58-4454-f880-08dfd2f39d3c"),
  Guid.parse("c0059b29-1327-0d4d-346e-53a5011b154a"),
  Guid.parse("2994d115-cf4a-88b2-a707-7e3b43892688"),
  Guid.parse("abce9136-1ce0-e9ca-b192-269fe6f789c1"),
  Guid.parse("4fda8de2-0119-4a3d-0788-caa5dcd11951"),
  Guid.parse("e7ab69da-a6b7-83d7-ffb2-da50c2ab7534")
];

const testVideos = [
  '<div style="padding:54.17% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/701028600?h=64c6a6d2e6" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/237823870?h=c47ddc92ae&color=ffffff" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/672680672?h=1b547c1751&title=0&byline=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/283927789?h=fecd8dddf8" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
];

const buildVideoList = function () {
  var node = <VideoNode>{};
  const nodeList = [];
  for (var i = 0; i < testVideos.length; i++) {
    node.video = <Video>{
      id: ids[i],
      html: testVideos[i],
      title: 'Title',
      storyPieces: videoProcess,
      client: resources.primary,
      preview: resources.secondary,
    };
    nodeList.push(node);
    if (i < testVideos.length)
      node.next = <VideoNode>{};
    node = node.next;
  }

  return nodeList;
}

const videoNodeList: VideoNode[] = buildVideoList();

export const videos: VideoNode = videoNodeList[0];
export const videoPreviews: any[] = videoNodeList.map(videoNode => {
  return {id: videoNode.video?.id, preview: videoNode.video?.preview};
});
