import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// views
import { SplashScreenComponent } from './views/splash-screen/splash-screen.component';
import { CarouselComponent } from './views/carousel/carousel.component';
import { CarouselDetailsComponent } from './views/carousel-details/carousel-details.component';
import { AlphanumericOrderPipe } from './pipes/alphanumeric-order.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    CarouselComponent,
    CarouselDetailsComponent,
    AlphanumericOrderPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
