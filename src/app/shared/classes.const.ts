import { SubtitleStyle, TileType, Width } from "./enums.const";

export class PageDefault {
  route = '';
  type = '';
  tiles = []
};

export class TileDefault {
  order = 0;
  type = TileType.Subtitle;
  text = '';
  center = false;
  width = Width.XL;
  style = SubtitleStyle.Bottom;
  images = [];
  columns = 1;
  hasFilters = false;
  videoId = '';
};

export class ImageDefault {
  order = 0;
  s3Key = '';
  link = '';
  url = '';
  shadow = false;
  overlay = false;
  icon = false;
  tags = [];
};