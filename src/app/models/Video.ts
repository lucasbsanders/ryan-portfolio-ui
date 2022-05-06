import { Guid } from "guid-typescript";

export interface Video {
  id: Guid;
  html: string;
  title: string;
  sortOrder: number;
  client: string;
  preview: string;
  storyPieces: string[];
  process: string[][];
}

export interface VideoNode {
  video: Video;
  previous: VideoNode;
  next: VideoNode;
}
