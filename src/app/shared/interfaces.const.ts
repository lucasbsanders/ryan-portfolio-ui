import { TileType, Width } from './enums.const';

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
  shadow?: boolean;
  mb?: number;
  mt?: number;
  textClass?: string;
  containerClass?: string;
  hidden?: boolean;
  videoId?: string;
  urlParams?: string;
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

export class PageDefault implements iPage {
  route = '';
  type = '';
  tiles = [];
  hidden = false;
}

export class TileDefault implements iTile {
  order = 0;
  type = TileType.Text;
  text = '';
  center = true;
  width = Width.M;
  images = [<iImage>{ order: 0, s3Key: '' }];
  columns = 1;
  filters = [];
  videoId = '';
  shadow = true;
  mb = 4;
  mt = 4;
  textClass = '';
  containerClass = '';
  hidden = false;
  urlParams = '';
}

export class ImageDefault implements iImage {
  order = 0;
  s3Key = '';
  subtitle = '';
  link = '';
  url = '';
  shadow = false;
  overlay = false;
  icon = false;
  tags = [];
  scale = false;
  hoverS3Key = '';
  hidden = false;
}
