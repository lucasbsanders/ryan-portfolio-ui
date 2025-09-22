import { TileType, Width } from './enums.const';

export interface iPage extends Record<string, any> {
  route: string;
  type: string;
  tiles: iTile[];
  hidden?: boolean;
}

export class PageDefault implements iPage {
  route = '';
  type = '';
  tiles = [];
  hidden = false;
}

export interface iTile extends Record<string, any> {
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
  elementClass?: string;
  hidden?: boolean;
  videoId?: string;
  urlParams?: string;
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
  elementClass = '';
  hidden = false;
  urlParams = '';
}

export interface iImage extends Record<string, any> {
  order: number;
  s3Key: string;
  subtitle?: string;
  link?: string;
  url?: string;
  overlay?: boolean;
  icon?: boolean;
  tags?: string[];
  scale?: boolean;
  hoverS3Key?: string;
  hidden?: boolean;
}

export class ImageDefault implements iImage {
  order = 0;
  s3Key = '';
  subtitle = '';
  link = '';
  url = '';
  overlay = false;
  icon = false;
  tags = [];
  scale = false;
  hoverS3Key = '';
  hidden = false;
}
