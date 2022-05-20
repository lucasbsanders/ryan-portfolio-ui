import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { LocalResourceService } from 'src/app/services/local-resource.service';
import { Router } from '@angular/router';
import { PageReadService } from 'src/app/services/page-read.service';
import { AwsConnectService } from 'src/app/services/aws-connect.service';
import { HtmlSanitizePipe } from 'src/app/shared/pipes/html-sanitize.pipe';

@Component({
  selector: 'app-fullscreen-menu',
  templateUrl: './fullscreen-menu.component.html',
  styleUrls: ['./fullscreen-menu.component.scss']
})
export class FullscreenMenuComponent implements OnInit {

  menuData: any[] = [];

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  constructor(private navbarService: NavbarService,
    private resourceService: LocalResourceService,
    private awsService: AwsConnectService,
    private pageService: PageReadService,
    private router: Router) {
      //this.videoReelUrl = this.resourceService.getConstUrls().videoReelUrl;
    }

  ngOnInit(): void {
    // this.pageService.getPageByRoute(this.menuDataKey).subscribe(menuData => {
    //   this.menuData = menuData;
    // });

    this.navbarService.getMenuData().subscribe(menuData => this.menuData = menuData);
  }

  closeMenu(): void {
    this.navbarService.menuOpen = false;
  }

  click() {
    this.navbarService.click();
  }

  goToPath(path: string) {
    this.router.navigate([path]);
    this.closeMenu();
  }

}
