import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  public configInit = {
    selectedMovie: null
  };

  public config = new BehaviorSubject<any>(this.configInit);

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get('https://swapi.co/api/films/');
  }

  getMovieDetails(url) {
    return this.http.get(url);
  }
}
