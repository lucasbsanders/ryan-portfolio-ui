import { Injectable } from '@angular/core';
import { TileType } from '../components/page-display/page-display.component';
import { AwsConnectService } from './aws-connect.service';

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const video =
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/237823870?h=c47ddc92ae&color=ffffff" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="fullscreen"></iframe></div>';

@Injectable({
  providedIn: 'root',
})
export class PageReadService {
  private allPages = [
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
              imgOrder: 0,
            },
            {
              s3Key: 'Azure Resiliency/AzureRes_thumbnail.png',
              link: 'Azure Resiliency',
              imgOrder: 1,
            },
            {
              s3Key: 'CBDI video library/CBDI_thumbnail.png',
              link: 'CBDI video library',
              imgOrder: 2,
            },
            {
              s3Key: 'Dell Migrate/Dell-Thumbnail.png',
              link: 'Dell Migrate',
              imgOrder: 3,
            },
            {
              s3Key: 'Microsoft Salt/Salt-thumbnail.png',
              link: 'Microsoft Salt',
              imgOrder: 4,
            },
            {
              s3Key: 'Queen Bee Mixology/QueenBee-Thumbnail.png',
              link: 'Queen Bee Mixology',
              imgOrder: 5,
            },
            {
              s3Key: 'Starbucks beans/starbucks_thumbnail.png',
              link: 'Starbucks beans',
              imgOrder: 6,
            },
            {
              s3Key: 'Twitter Supplier Diversity/Twitter_thumbnail.png',
              link: 'Twitter Supplier Diversity',
              imgOrder: 7,
            },
            {
              s3Key: 'VMG Studios/VMG-Thumbnail.png',
              link: 'VMG Studios',
              imgOrder: 8,
            },
            {
              s3Key: 'Windows 11 promo/Windows11_thumbnail.png',
              link: 'Windows 11 promo',
              imgOrder: 9,
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
              link: '',
              imgOrder: 0,
            },
            {
              s3Key: 'static/Company logos/Company logo-Ericsson.svg',
              link: '',
              imgOrder: 1,
            },
            {
              s3Key: 'static/Company logos/Company logo-Google.svg',
              link: '',
              imgOrder: 2,
            },
            {
              s3Key: 'static/Company logos/Company logo-Meta.svg',
              link: '',
              imgOrder: 3,
            },
            {
              s3Key: 'static/Company logos/Company logo-Microsoft.svg',
              link: '',
              imgOrder: 4,
            },
            {
              s3Key: 'static/Company logos/Company logo-Starbucks.svg',
              link: '',
              imgOrder: 5,
            },
          ],
        },
      ],
    },
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
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            },
          ],
        },
        {
          type: TileType.Slideshow,
          order: 3,
          images: [
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
          ],
        },
        {
          type: TileType.Slideshow,
          order: 5,
          images: [
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_white.svg',
            },
            {
              s3Key: 'assets/siteLogos/RyanFennessey_logo_black.svg',
            },
          ],
        },
      ],
    },
  ];

  constructor(private awsService: AwsConnectService) {}

  getPageByRoute(route: string): any {
    return this.allPages.find((page) => page.route.localeCompare(route) === 0);
  }
}
