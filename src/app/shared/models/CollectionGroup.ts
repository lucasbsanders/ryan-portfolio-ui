import { Guid } from "guid-typescript";
import { DisplayItem } from "./DisplayItem";

export interface CollectionGroup {
  id: Guid;
  title: string;
  displayItems: DisplayItem[];
}