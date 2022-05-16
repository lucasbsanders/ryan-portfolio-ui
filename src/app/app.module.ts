import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { EnterViewPortDirective } from './shared/directives/enter-view-port.directive';
import { SharedModule } from './shared/shared.module';
import { PageDisplayComponent } from './components/page-display/page-display.component';

@NgModule({
  declarations: [
    AppComponent,
    EnterViewPortDirective,
    ProjectDetailsComponent,
    PageDisplayComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
