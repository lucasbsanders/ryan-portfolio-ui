import { TileType, Width } from "./enums.const";
import { iImage, iPage, iTile } from "./interfaces.const";

export class PageDefault implements iPage {
  route = '';
  type = '';
  tiles = [];
};

export class TileDefault implements iTile {
  order = 0;
  type = TileType.Subtitle;
  text = '';
  center = false;
  width = Width.XL;
  images = [];
  columns = 1;
  hasFilters = false;
  videoId = '';
  shadow = false;
};

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
};