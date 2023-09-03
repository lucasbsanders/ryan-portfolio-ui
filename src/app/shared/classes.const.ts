import { TileType, Width } from './enums.const';
import { iImage, iPage, iTile } from './interfaces.const';

export class PageDefault implements iPage {
  route = '';
  type = '';
  tiles = [];
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
}
