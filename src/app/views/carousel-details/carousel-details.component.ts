import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, ElementRef, QueryList, OnDestroy } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { Carousel } from 'materialize-css';
import { Movie } from '../../interfaces/movie';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-carousel-details',
  templateUrl: './carousel-details.component.html',
  styleUrls: ['./carousel-details.component.scss'],
})
export class CarouselDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('carousel') carousel: ElementRef;
  @ViewChildren('carousel') carouselChildren: QueryList<any>;
  private subscriptions = new Subscription();
  private movieSubscription: Subscription;
  private carouselChildSubscription: Subscription;
  private matCarousel: Carousel;
  private movieEndpoints: Array<any> = [];
  public characters: Array<any> = [];
  private movieUrl: Params;

  constructor(private movieService: MoviesService, private route: ActivatedRoute, private router: Router) {
    this.movieUrl = this.route.snapshot.queryParams.movie_url;
    console.log(this.movieUrl);
  }

  ngAfterViewInit() {
    this.carouselChildSubscription = this.carouselChildren.changes.subscribe(changes => {
      this.handleCarouselChildLoad();
    });

    // get chosen movie from api
    this.movieSubscription = this.movieService.getMovieDetails(this.movieUrl).subscribe((movie: Movie) => {
      // get characters and their properties
      this.handleMultipleUrls(movie.characters, this.movieEndpoints, generatedEndpoints => {
        const characterRequests = this.handleUrlsRequests(generatedEndpoints);

        characterRequests.subscribe((characters: any) => {
          characters.map((character) => {
            // get species and their properties
            if (character.species.length) {
              return this.movieService
                .getMovieDetails(character.species[0]).toPromise().then((species: any) => {
                  character.species = species;
                  return character;
                });
            } else {
              return character;
            }
          });

          this.characters = characters;
        });
      });
    });

    // this.subscriptions.add(this.movieSubscription);
    this.subscriptions.add(this.carouselChildSubscription);
    this.subscriptions.add(this.movieSubscription);
  }

  ngOnInit() {}

  handleCarouselChildLoad() {
    const carouselInit = new Carousel(this.carousel.nativeElement, {});
    this.matCarousel = Carousel.getInstance(carouselInit.el);
  }

  handleUrl(url, generatedEndpoints) {
    generatedEndpoints.push(this.movieService.getMovieDetails(url));
  }

  handleUrlsRequests(urls: Array<Observable<object>>) {
    return forkJoin(urls);
  }

  handleMultipleUrls(urls, generatedEndpoints, cb) {
    // group character urls as requests
    urls.forEach((url, idx, arr) => {
      // create url observable requests array
      this.handleUrl(url, generatedEndpoints);
      if (idx === arr.length - 1) {
        // handle requests as one observable
        cb(generatedEndpoints);
      }
    });
  }

  goBack() {
    this.router.navigate(['carousel'], {
      queryParams: {
        carousel_index: this.route.snapshot.queryParams.carousel_index
      }
    });
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
