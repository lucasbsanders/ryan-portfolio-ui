import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './components/collection/collection.component';
import { HomeComponent } from './components/home/home.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: ImageDetailsComponent },
  { path: ':collection', component: CollectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
