import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Carousel } from 'materialize-css';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie';
import { Subscription } from 'rxjs';
import { MovieResponse } from '../../interfaces/movie-response';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('carousel') carousel: ElementRef;
  @ViewChildren('carousel') carouselChildren: QueryList<any>;
  private subscriptions = new Subscription();
  private movieSubscription: Subscription;
  private carouselChildSubscription: Subscription;
  private carouselIndex: number;
  private matCarousel: Carousel;
  public movies: Array<Movie> = [];
  public characters: Array<string> = [];

  constructor(private movieService: MoviesService, private router: Router, private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.movieSubscription = this.movieService.getMovies().subscribe((resp: MovieResponse) => {
      this.movies = resp.results;
    });

    this.carouselChildSubscription = this.carouselChildren.changes.subscribe(changes => {
      this.handleCarouselChildLoad();
    });

    this.subscriptions.add(this.movieSubscription);
    this.subscriptions.add(this.carouselChildSubscription);


  }

  ngOnInit() {}

  handleCarouselChildLoad() {
    if (this.movies.length) {
      console.log(this.movies);
      const carouselInit = new Carousel(this.carousel.nativeElement, {});
      this.matCarousel = Carousel.getInstance(carouselInit.el);
      this.handleReturnToPage();
    }
  }

  handleMovieSelection(movie, idx) {
    this.router.navigate(['carousel-details'], {
      queryParams: {
        movie_url: movie.url,
        carousel_index: idx
      }
    });
  }

  handleReturnToPage() {
    this.carouselIndex = this.route.snapshot.queryParams.carousel_index;
    this.matCarousel.set(this.carouselIndex);
  }

  navigatePrev() {
    this.matCarousel.prev();
  }

  navigateNext() {
    this.matCarousel.next();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
