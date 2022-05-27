export const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const video =
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/237823870?h=c47ddc92ae&color=ffffff" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="fullscreen"></iframe></div>';

export enum TileType {
  Title = 'Title',
  Text = 'Text',
  Slideshow = 'Slideshow',
  ImageGrid = 'ImageGrid',
  ImageSubtitle = 'ImageSubtitle',
  Subtitle = 'Subtitle',
  VimeoVid = 'VimeoVid',
};

export enum Width {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  FULL = 'FULL',
};

export enum PageType {
  Project = 'Project',
  Static = 'Static',
  Layout = 'Layout',
};

/** 
export const allPages: any[] = [

  /////////////////////////////////////////////////
  ////////////   Portfolio page   ////////////
  /////////////////////////////////////////////////
  {
    route: 'portfolio',
    tileCount: 4,
    tiles: [
      { type: TileType.Title, order: 0, text: 'portfolio' },
      {
        type: TileType.ImageGrid,
        order: 1,
        columns: 2,
        large: true,
        hasFilters: true,
        images: [
          {
            s3Key: '5-3 Young Bankers Club/FifthThird_thumbnail.png',
            link: '5-3 Young Bankers Club',
            order: 0,
          },
          {
            s3Key: 'Azure Resiliency/AzureRes_thumbnail.png',
            link: 'Azure Resiliency',
            order: 1,
          },
          {
            s3Key: 'CBDI video library/CBDI_thumbnail.png',
            link: 'CBDI video library',
            order: 2,
          },
          {
            s3Key: 'Dell Migrate/Dell-Thumbnail.png',
            link: 'Dell Migrate',
            order: 3,
          },
          {
            s3Key: 'Microsoft Salt/Salt-thumbnail.png',
            link: 'Microsoft Salt',
            order: 4,
          },
          {
            s3Key: 'Queen Bee Mixology/QueenBee-Thumbnail.png',
            link: 'Queen Bee Mixology',
            order: 5,
          },
          {
            s3Key: 'Starbucks beans/starbucks_thumbnail.png',
            link: 'Starbucks beans',
            order: 6,
          },
          {
            s3Key: 'Twitter Supplier Diversity/Twitter_thumbnail.png',
            link: 'Twitter Supplier Diversity',
            order: 7,
          },
          {
            s3Key: 'VMG Studios/VMG-Thumbnail.png',
            link: 'VMG Studios',
            order: 8,
          },
          {
            s3Key: 'Windows 11 promo/Windows11_thumbnail.png',
            link: 'Windows 11 promo',
            order: 9,
          },
        ],
      },
      { type: TileType.Title, order: 2, margin: true, text: 'brands I know' },
      {
        type: TileType.ImageGrid,
        order: 3,
        columns: 3,
        large: false,
        hasFilters: false,
        gutters: true,
        images: [
          {
            s3Key: 'static/Company logos/Company logo-Amazon.svg',
            order: 0,
          },
          {
            s3Key: 'static/Company logos/Company logo-Ericsson.svg',
            order: 1,
          },
          {
            s3Key: 'static/Company logos/Company logo-Google.svg',
            order: 2,
          },
          {
            s3Key: 'static/Company logos/Company logo-Meta.svg',
            order: 3,
          },
          {
            s3Key: 'static/Company logos/Company logo-Microsoft.svg',
            order: 4,
          },
          {
            s3Key: 'static/Company logos/Company logo-Starbucks.svg',
            order: 5,
          },
        ],
      },
    ],
  },


  /////////////////////////////////////////////////
  ////////////   About Me page   ////////////
  /////////////////////////////////////////////////
  {
    route: 'about',
    tileCount: 2,
    tiles: [
      { type: TileType.Title, order: 0, text: 'about me', margin: true },
      {
        type: TileType.Text,
        order: 1,
        columns: 2,
        text: text,
        margin: true,
        images: [
          {
            s3Key: 'static/headshot.png',
          },
        ],
      },
    ],
  },

  /////////////////////////////////////////////////////////
  ////////////   Services and Capabilities page   ////////////
  //////////////////////////////////////////////////////////
  {
    route: 'services',
    tileCount: 7,
    tiles: [
      { type: TileType.Title, order: 0, text: 'services and capabilities' },
      { type: TileType.Title, order: 3, text: '2022 video reel' },
      { type: TileType.Title, order: 5, text: 'software' },
      {
        type: TileType.ImageGrid,
        order: 1,
        columns: 1,
        images: [
          {
            s3Key: 'Starbucks beans/starbucks_thumbnail.png',
          },
        ],
      },
      {
        type: TileType.Text,
        order: 2,
        columns: 2,
        margin: true,
        text: text,
      },
      {
        type: TileType.VimeoVid,
        order: 4,
        text: video,
      },
      {
        type: TileType.ImageGrid,
        order: 6,
        columns: 1,
        images: [
          {
            s3Key: 'Starbucks beans/starbucks_thumbnail.png',
          },
        ],
      },
    ],
  },

  /////////////////////////////////////////////////
  ////////////   Illustrated Books page   ////////////
  /////////////////////////////////////////////////
  {
    route: 'books',
    tileCount: 6,
    tiles: [
      {
        type: TileType.Title,
        order: 0,
        text: 'Book title 1 and the fantastic book',
      },
      { type: TileType.Title, order: 2, text: '2sday' },
      { type: TileType.Title, order: 4, text: 'Threes Books' },
      {
        type: TileType.Slideshow,
        order: 1,
        margin: true,
        images: [
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 0,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 1,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 2,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 3,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 4,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 5,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 6,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 7,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 8,
          },
        ],
      },
      {
        type: TileType.Slideshow,
        order: 3,
        images: [
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 0,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 1,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 2,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 3,
          },
        ],
      },
      {
        type: TileType.Slideshow,
        order: 5,
        images: [
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 0,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 1,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 2,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 3,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 4,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 5,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 6,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 7,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 8,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 9,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 10,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 11,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 12,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 13,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 14,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 15,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 16,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 17,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 18,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 19,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 20,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 21,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 22,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 23,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            order: 24,
          },
          {
            s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            order: 25,
          },
        ],
      },
    ],
  },
];
*/