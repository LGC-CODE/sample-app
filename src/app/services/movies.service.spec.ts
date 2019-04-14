import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import {HttpEvent} from '@angular/common/http';

describe('MoviesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoviesService = TestBed.get(MoviesService);
    expect(service).toBeTruthy();
  });

  it('it should return an Observable', () => {
    const service: MoviesService = TestBed.get(MoviesService);
    service.getMovieDetails('').subscribe(
      (resp: HttpEvent<any>) => {
        console.log(resp);
        expect(resp).toEqual({});
      }
    );
  });
});
