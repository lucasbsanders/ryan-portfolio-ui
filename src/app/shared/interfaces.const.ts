interface Map {
  [key: string]: any
}

export interface iPage extends Map {
  route: string,
  type: string,
  tiles: iTile[]
};
export interface iTile extends Map {
  order: number,
  type: string,
  text: string,
  width: string,
  center?: boolean,
  images?: iImage[],
  columns?: number,
  hasFilters?: boolean,
  videoId?: string
};

export interface iImage extends Map {
  order: number,
  s3Key: string,
  subtitle?: string,
  link?: string,
  url?: string,
  shadow?: boolean,
  overlay?: boolean,
  icon?: boolean,
  tags?: string[],
  scale?: boolean
};
