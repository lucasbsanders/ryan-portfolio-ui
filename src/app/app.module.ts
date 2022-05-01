import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollectionComponent } from './components/collection/collection.component';
import { HomeComponent } from './components/home/home.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { ImageFullscreenComponent } from './components/image-fullscreen/image-fullscreen.component';
import { ImageSquareComponent } from './components/image-square/image-square.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Page404Component } from './shared/404';
import { EnterViewPortDirective } from './shared/enter-view-port.directive';
import { SharedModule } from './shared/shared.module';
import { FullscreenMenuComponent } from './components/fullscreen-menu/fullscreen-menu.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CollectionComponent,
    HomeComponent,
    ImageFullscreenComponent,
    ImageDetailsComponent,
    ImageSquareComponent,
    Page404Component,
    EnterViewPortDirective,
    FullscreenMenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
