import { Guid } from "guid-typescript";

export interface Video {
  id: Guid;
  html: string;
  preview: string;
  title: string;
  client: string;
  storyPieces: string[];
  process: string[][];
}

export interface VideoNode {
  video: Video | null;
  previous: VideoNode;
  next: VideoNode;
}
