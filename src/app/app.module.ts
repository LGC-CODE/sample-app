import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// views
import { SplashScreenComponent } from './views/splash-screen/splash-screen.component';
import { CarouselComponent } from './views/carousel/carousel.component';

// carousel

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
