import { Guid } from "guid-typescript";

export enum ItemType {
  Unknown = 0,
  Image,
  Animation,
  Video,
}

export class DisplayItem {
  id: Guid = Guid.createEmpty();
  url: string = ''
  author: string = '';
  title: string = '';
  comments: string[] = [];
  type: ItemType = ItemType.Unknown;

  public constructor() { }
}