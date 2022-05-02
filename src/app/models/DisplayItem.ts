import { Guid } from "guid-typescript";

export enum ItemType {
  Unknown = 0,
  Image,
  Animation,
  Video,
}

export interface DisplayItem {
  id: Guid;
  url: string;
  author: string;
  title: string;
  comments: string[];
  type: ItemType;
}