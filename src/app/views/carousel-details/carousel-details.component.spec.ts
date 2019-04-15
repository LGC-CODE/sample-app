import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CarouselDetailsComponent } from './carousel-details.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie';
import { Subscription, Observable } from 'rxjs';
import { AlphanumericOrderPipe } from '../../pipes/alphanumeric-order.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import {Character} from '../../interfaces/character';
import {Carousel} from 'materialize-css';

describe('CarouselDetailsComponent', () => {
  let component: CarouselDetailsComponent;
  let fixture: ComponentFixture<CarouselDetailsComponent>;
  let characterEndpoints;
  let preprocessedCharacters;
  let character;
  let movie;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [MoviesService],
      declarations: [CarouselDetailsComponent, AlphanumericOrderPipe],
    }).compileComponents();
  }));

  beforeEach(inject(
    [MoviesService, HttpTestingController],
    (movieService: MoviesService, httpMock: HttpTestingController) => {
      fixture = TestBed.createComponent(CarouselDetailsComponent);
      component = fixture.componentInstance;
      character = [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'https://swapi.co/api/planets/1/',
          films: [
            'https://swapi.co/api/films/2/',
            'https://swapi.co/api/films/6/',
            'https://swapi.co/api/films/3/',
            'https://swapi.co/api/films/1/',
            'https://swapi.co/api/films/7/',
          ],
          species: ['https://swapi.co/api/species/1/'],
          vehicles: ['https://swapi.co/api/vehicles/14/', 'https://swapi.co/api/vehicles/30/'],
          starships: ['https://swapi.co/api/starships/12/', 'https://swapi.co/api/starships/22/'],
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
          url: 'https://swapi.co/api/people/1/',
        },
      ];
      movie = {
        title: 'A New Hope',
        episode_id: 4,
        // tslint:disable-next-line:max-line-length
        opening_crawl: 'It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire\'s\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire\'s\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....',
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        characters: [
            'https://swapi.co/api/people/1/',
            'https://swapi.co/api/people/2/',
            'https://swapi.co/api/people/3/',
            'https://swapi.co/api/people/4/',
            'https://swapi.co/api/people/5/',
            'https://swapi.co/api/people/6/',
            'https://swapi.co/api/people/7/',
            'https://swapi.co/api/people/8/',
            'https://swapi.co/api/people/9/',
            'https://swapi.co/api/people/10/',
            'https://swapi.co/api/people/12/',
            'https://swapi.co/api/people/13/',
            'https://swapi.co/api/people/14/',
            'https://swapi.co/api/people/15/',
            'https://swapi.co/api/people/16/',
            'https://swapi.co/api/people/18/',
            'https://swapi.co/api/people/19/',
            'https://swapi.co/api/people/81/'
        ],
        planets: [
            'https://swapi.co/api/planets/2/',
            'https://swapi.co/api/planets/3/',
            'https://swapi.co/api/planets/1/'
        ],
        starships: [
            'https://swapi.co/api/starships/2/',
            'https://swapi.co/api/starships/3/',
            'https://swapi.co/api/starships/5/',
            'https://swapi.co/api/starships/9/',
            'https://swapi.co/api/starships/10/',
            'https://swapi.co/api/starships/11/',
            'https://swapi.co/api/starships/12/',
            'https://swapi.co/api/starships/13/'
        ],
        vehicles: [
            'https://swapi.co/api/vehicles/4/',
            'https://swapi.co/api/vehicles/6/',
            'https://swapi.co/api/vehicles/7/',
            'https://swapi.co/api/vehicles/8/'
        ],
        species: [
            'https://swapi.co/api/species/5/',
            'https://swapi.co/api/species/3/',
            'https://swapi.co/api/species/2/',
            'https://swapi.co/api/species/1/',
            'https://swapi.co/api/species/4/'
        ],
        created: '2014-12-10T14:23:31.880000Z',
        edited: '2015-04-11T09:46:52.774897Z',
        url: 'https://swapi.co/api/films/1/'
      };
      fixture.detectChanges();

      // get chosen movie from api
      // create observables from characters urls
      characterEndpoints = component.generateEndpoints(movie.characters);
      // join character url observables into one observable
      component.handleUrlsRequests(characterEndpoints).subscribe(characters => {
        // populate species into character's object
        preprocessedCharacters = characters;
      });
    }
  ));

  it('should return a promise with characters\' array', inject(
    [HttpTestingController, MoviesService],
    (httpMock: HttpTestingController, movieService: MoviesService) => {
      component.handleGeneratedEndpoints(preprocessedCharacters).then(characters => {
        expect(characters).toEqual(character);
      });
    }
  ));

  it('should return a subscribable with a characters\' object', inject(
    [HttpTestingController, MoviesService],
    (httpMock: HttpTestingController, movieService: MoviesService) => {
      component.handleUrlsRequests(characterEndpoints).subscribe(characters => {
        expect(characters).toEqual(character);
      });
    }
  ));

  it('should return a Carousel instance', inject(
    [HttpTestingController, MoviesService],
    (httpMock: HttpTestingController, movieService: MoviesService) => {
      const mockElem = document.createElement('div');
      mockElem.innerHTML =
        `<div class="carousel">
          <div class="carousel-item">
            <h2 [innerHTML]="'Title'"></h2>
            <h4 [innerHTML]="'Description'"></h4>
            <div class="progress">
              <div class="indeterminate"></div>
            </div>
          </div>
        </div>
      `;
      expect(
        (component.handleCarouselChildLoad(mockElem) instanceof Carousel)
      ).toBeTruthy();
    }
  ));
});
