import { Width } from './enums.const';

interface Map {
  [key: string]: any;
}

export interface iPage extends Map {
  route: string;
  type: string;
  tiles: iTile[];
}

export interface iTile extends Map {
  order: number;
  type: string;
  text: string;
  width?: Width;
  center?: boolean;
  images?: iImage[];
  columns?: number;
  filters?: string[];
  videoId?: string;
  shadow?: boolean;
  mb?: number;
  mt?: number;
  textClass?: string;
}

export interface iImage extends Map {
  order: number;
  s3Key: string;
  subtitle?: string;
  link?: string;
  url?: string;
  shadow?: boolean;
  overlay?: boolean;
  icon?: boolean;
  tags?: string[];
  scale?: boolean;
}
