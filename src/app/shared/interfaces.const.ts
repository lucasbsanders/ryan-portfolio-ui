export interface iPage {
  route: string,
  type: string,
  tiles: iTile[]
};
export interface iTile {
  order: number,
  type: string,
  text: string,
  center: boolean,
  width: string,
  style: string,
  images: iImage[],
  columns: number,
  hasFilters: boolean,
  videoId: string
};

export interface iImage {
  order: number,
  s3Key: string,
  subtitle: string,
  link: string,
  url: string,
  shadow: boolean,
  overlay: boolean,
  icon: boolean,
  tags: string[],
  scale: boolean
};
