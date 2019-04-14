import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Carousel } from 'materialize-css';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carousel: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    console.log(new Carousel(this.carousel.nativeElement, {}));
  }

  ngOnInit() {
  }


}
