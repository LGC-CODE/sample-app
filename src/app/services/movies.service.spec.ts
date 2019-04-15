import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MoviesService } from './movies.service';
import { HttpEvent } from '@angular/common/http';
import { Movie } from '../interfaces/movie';
import { MovieResponse } from '../interfaces/movie-response';
import {Species} from '../interfaces/species';

describe('MoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });
  });

  it('should return a movies list', inject(
    [HttpTestingController, MoviesService],
    (httpMock: HttpTestingController, movieService: MoviesService) => {
      const testMovieData = [
        {
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
            'https://swapi.co/api/people/81/',
          ],
          planets: [
            'https://swapi.co/api/planets/2/',
            'https://swapi.co/api/planets/3/',
            'https://swapi.co/api/planets/1/',
          ],
          starships: [
            'https://swapi.co/api/starships/2/',
            'https://swapi.co/api/starships/3/',
            'https://swapi.co/api/starships/5/',
            'https://swapi.co/api/starships/9/',
            'https://swapi.co/api/starships/10/',
            'https://swapi.co/api/starships/11/',
            'https://swapi.co/api/starships/12/',
            'https://swapi.co/api/starships/13/',
          ],
          vehicles: [
            'https://swapi.co/api/vehicles/4/',
            'https://swapi.co/api/vehicles/6/',
            'https://swapi.co/api/vehicles/7/',
            'https://swapi.co/api/vehicles/8/',
          ],
          species: [
            'https://swapi.co/api/species/5/',
            'https://swapi.co/api/species/3/',
            'https://swapi.co/api/species/2/',
            'https://swapi.co/api/species/1/',
            'https://swapi.co/api/species/4/',
          ],
          created: '2014-12-10T14:23:31.880000Z',
          edited: '2015-04-11T09:46:52.774897Z',
          url: 'https://swapi.co/api/films/1/',
        },
      ];

      movieService.getMovies().subscribe((movies: MovieResponse) => {
        expect(movies.results).toEqual(testMovieData);
      });
    }
  ));

  it('should return a movie object', inject(
    [HttpTestingController, MoviesService],
    (httpMock: HttpTestingController, movieService: MoviesService) => {
      const testMovieData = {
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
          'https://swapi.co/api/people/81/',
        ],
        planets: [
          'https://swapi.co/api/planets/2/',
          'https://swapi.co/api/planets/3/',
          'https://swapi.co/api/planets/1/',
        ],
        starships: [
          'https://swapi.co/api/starships/2/',
          'https://swapi.co/api/starships/3/',
          'https://swapi.co/api/starships/5/',
          'https://swapi.co/api/starships/9/',
          'https://swapi.co/api/starships/10/',
          'https://swapi.co/api/starships/11/',
          'https://swapi.co/api/starships/12/',
          'https://swapi.co/api/starships/13/',
        ],
        vehicles: [
          'https://swapi.co/api/vehicles/4/',
          'https://swapi.co/api/vehicles/6/',
          'https://swapi.co/api/vehicles/7/',
          'https://swapi.co/api/vehicles/8/',
        ],
        species: [
          'https://swapi.co/api/species/5/',
          'https://swapi.co/api/species/3/',
          'https://swapi.co/api/species/2/',
          'https://swapi.co/api/species/1/',
          'https://swapi.co/api/species/4/',
        ],
        created: '2014-12-10T14:23:31.880000Z',
        edited: '2015-04-11T09:46:52.774897Z',
        url: 'https://swapi.co/api/films/1/',
      };

      movieService.getMovie('https://swapi.co/api/films/1/').subscribe((movies: Movie) => {
        expect(movies).toEqual(testMovieData);
      });
    }
  ));

  it('should return a species object', inject(
    [HttpTestingController, MoviesService],
    (httpMock: HttpTestingController, movieService: MoviesService) => {
      const testSpeciesData = {
        name: 'Human',
        classification: 'mammal',
        designation: 'sentient',
        average_height: '180',
        skin_colors: 'caucasian, black, asian, hispanic',
        hair_colors: 'blonde, brown, black, red',
        eye_colors: 'brown, blue, green, hazel, grey, amber',
        average_lifespan: '120',
        homeworld: 'https://swapi.co/api/planets/9/',
        language: 'Galactic Basic',
        people: [
          'https://swapi.co/api/people/1/',
          'https://swapi.co/api/people/4/',
          'https://swapi.co/api/people/5/',
          'https://swapi.co/api/people/6/',
          'https://swapi.co/api/people/7/',
          'https://swapi.co/api/people/9/',
          'https://swapi.co/api/people/10/',
          'https://swapi.co/api/people/11/',
          'https://swapi.co/api/people/12/',
          'https://swapi.co/api/people/14/',
          'https://swapi.co/api/people/18/',
          'https://swapi.co/api/people/19/',
          'https://swapi.co/api/people/21/',
          'https://swapi.co/api/people/22/',
          'https://swapi.co/api/people/25/',
          'https://swapi.co/api/people/26/',
          'https://swapi.co/api/people/28/',
          'https://swapi.co/api/people/29/',
          'https://swapi.co/api/people/32/',
          'https://swapi.co/api/people/34/',
          'https://swapi.co/api/people/43/',
          'https://swapi.co/api/people/51/',
          'https://swapi.co/api/people/60/',
          'https://swapi.co/api/people/61/',
          'https://swapi.co/api/people/62/',
          'https://swapi.co/api/people/66/',
          'https://swapi.co/api/people/67/',
          'https://swapi.co/api/people/68/',
          'https://swapi.co/api/people/69/',
          'https://swapi.co/api/people/74/',
          'https://swapi.co/api/people/81/',
          'https://swapi.co/api/people/84/',
          'https://swapi.co/api/people/85/',
          'https://swapi.co/api/people/86/',
          'https://swapi.co/api/people/35/',
        ],
        films: [
          'https://swapi.co/api/films/2/',
          'https://swapi.co/api/films/7/',
          'https://swapi.co/api/films/5/',
          'https://swapi.co/api/films/4/',
          'https://swapi.co/api/films/6/',
          'https://swapi.co/api/films/3/',
          'https://swapi.co/api/films/1/',
        ],
        created: '2014-12-10T13:52:11.567000Z',
        edited: '2015-04-17T06:59:55.850671Z',
        url: 'https://swapi.co/api/species/1/',
      };

      movieService.getSpecies('https://swapi.co/api/species/1/').subscribe((species: Species) => {
        expect(species).toEqual(testSpeciesData);
      });
    }
  ));
});
