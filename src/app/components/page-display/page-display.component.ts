import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageReadService } from 'src/app/services/page-read.service';

export enum TileType {
  Title = 'Title',
  Text = 'Text',
  Slideshow = 'Slideshow',
  ImageGrid = 'ImageGrid',
  VimeoVid = 'VimeoVid',
}

@Component({
  selector: 'app-page-display',
  templateUrl: './page-display.component.html',
  styleUrls: ['./page-display.component.scss'],
})
export class PageDisplayComponent implements AfterViewInit, OnInit {
  TileType = TileType;
  mouseOverId = '';
  colAdj = 0; // global column adjust for mobile
  pageNotFound = false;

  private _page: any = {};
  private _route: string = '';

  get tiles(): any[] {
    return !this._page || !this._page.tiles
      ? []
      : this._page.tiles;
  }

  constructor(
    private pageService: PageReadService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this._route = <string>paramMap.get('path');
      this._page = {};
      this.pageNotFound = false;
      this.onResize({target: { innerWidth: window.innerWidth }});

      setTimeout( () => {
        this._page = this.pageService.getPageByRoute(this._route);
        if (!this._page) this.pageNotFound = true;
        else {
          this._page.tiles.sort((a: any, b: any) => {
            return a.order - b.order;
          });
  
          setTimeout( () => {
            this.activateSlideshows();
          }, 1000);
        }
      }, 1000);
    });
  }

  onResize(event: any) {
    if (event.target.innerWidth < 576) {
      this.colAdj = -1;
    } else {
      this.colAdj = 0;
    }
  }

  ngAfterViewInit(): void {
    this.activateSlideshows();
  }

  setMouseOver(id: string): void {
    this.mouseOverId = id;
  }

  goToPath(id: string) {
    this.router.navigate(['details/' + id.toString()]);
  }

  offsetClass(index: number, length: number) {
    return index + 1 === length && (index + 1) % 2 == 1;
  }

  activateSlideshows() {
    for (var i = 0; i < this.tiles.length; i++) {
      const isSlideshow = this.tiles[i].type.localeCompare(TileType.Slideshow) === 0;
      if (isSlideshow) {
        document.getElementById('book' + i + 'btn0')?.classList.add('active');
        document.getElementById('book' + i + 'page0')?.classList.add('active');
      }
    }
  }
}
