import { Guid } from "guid-typescript";
import { DisplayItem } from "./DisplayItem";

export class CollectionGroup {
  id: Guid = Guid.createEmpty();
  title: string = '';
  displayItems: DisplayItem[] = [];

  public constructor() { }
}