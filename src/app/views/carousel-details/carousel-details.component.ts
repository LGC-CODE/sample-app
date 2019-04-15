import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, ElementRef, QueryList, OnDestroy } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { Carousel } from 'materialize-css';
import { Movie } from '../../interfaces/movie';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Character} from '../../interfaces/character';

@Component({
  selector: 'app-carousel-details',
  templateUrl: './carousel-details.component.html',
  styleUrls: ['./carousel-details.component.scss'],
})
export class CarouselDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('carousel') public carousel: ElementRef;
  @ViewChildren('carousel') carouselChildren: QueryList<any>;
  private subscriptions = new Subscription();
  private movieSubscription: Subscription;
  private carouselChildSubscription: Subscription;
  public matCarousel: Carousel;
  private characterEndpoints: Array<Observable<Character>>;
  public characters: Array<Character> = [];
  private movieUrl: string;

  constructor(private movieService: MoviesService, private route: ActivatedRoute, private router: Router) {
    this.movieUrl = this.route.snapshot.queryParams.movie_url;
    console.log(this.movieUrl);
  }

  ngAfterViewInit() {
    // only initialize carousel when all elements are populated
    this.carouselChildSubscription = this.carouselChildren.changes.subscribe(changes => {
      this.matCarousel = this.handleCarouselChildLoad(this.carousel.nativeElement);
    });

    // get chosen movie from api
    this.movieSubscription = this.movieService.getMovie(this.movieUrl).subscribe((movie: Movie) => {
      // create observables from characters urls
      this.characterEndpoints = this.generateEndpoints(movie.characters);

      // join character url observables into one observable
      this.handleUrlsRequests(this.characterEndpoints).subscribe(
        characters => {
          // populate species into character's object
          this.handleGeneratedEndpoints(characters).then(
            characterList => {
              // get modified characters list that includes populated species
              this.characters = characterList;
            }
          );
        }
      );
    });

    this.subscriptions.add(this.carouselChildSubscription);
    this.subscriptions.add(this.movieSubscription);
  }

  ngOnInit() {}

  handleCarouselChildLoad(el: HTMLElement) {
    const carouselInit = new Carousel(el, {});
    return Carousel.getInstance(carouselInit.el);
  }


  handleUrlsRequests(urls: Array<Observable<Character>>) {
    return forkJoin(urls);
  }

  generateEndpoints(urls: Array<string>): Array<Observable<Character>> {
    console.log(urls);
    // group character urls as requests
    return urls.map((url, idx, arr) => {
      // create url observable requests array
      return this.movieService.generateHttpRequest(url);
    });
  }

  handleGeneratedEndpoints(characters): Promise<Array<Character>> {
    console.log(characters, 'characters');
    const charactersPromise = new Promise((resolve, reject) => {
      characters.map((character, idx, arr) => {
        // get species and their properties
        if (character.species.length) {
          return this.movieService.getSpecies(character.species[0])
            .toPromise().then((species: any) => {
              character.species = species;
              return character;
            });
        } else {
          return character;
        }
      });

      resolve(characters);
    });

    return charactersPromise as Promise<Array<Character>>;
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
