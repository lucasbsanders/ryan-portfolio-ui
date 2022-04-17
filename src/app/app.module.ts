import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollectionComponent } from './components/collection/collection.component';
import { HomeComponent } from './components/home/home.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { ImageFullscreenComponent } from './components/image-fullscreen/image-fullscreen.component';
import { ImageTileComponent } from './components/image-tile/image-tile.component';
import { SharedModule } from './shared/shared.module';
import { TitleComponent } from './shared/title/title.component';

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    ImageTileComponent,
    TitleComponent,
    HomeComponent,
    ImageFullscreenComponent,
    ImageDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
