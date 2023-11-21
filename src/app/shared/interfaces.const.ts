import { Width } from './enums.const';

interface Map {
  [key: string]: any;
}

export interface iPage extends Map {
  route: string;
  type: string;
  tiles: iTile[];
  hidden?: boolean;
}

export interface iTile extends Map {
  order: number;
  type: string;
  text?: string;
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
  containerClass?: string;
  hidden?: boolean;
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
  hoverS3Key?: string;
  hidden?: boolean;
}
