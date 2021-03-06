import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SplashScreenComponent} from './views/splash-screen/splash-screen.component';
import {CarouselComponent} from './views/carousel/carousel.component';
import {CarouselDetailsComponent} from './views/carousel-details/carousel-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'splash-screen', pathMatch: 'full' },
  { path: 'splash-screen', component: SplashScreenComponent, data: { animation: 'splash' } },
  { path: 'carousel', component: CarouselComponent, data: { animation: 'carousel' } },
  { path: 'carousel-details', component: CarouselDetailsComponent, data: { animation: 'carousel-details' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
