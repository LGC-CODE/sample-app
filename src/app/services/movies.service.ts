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

  generateHttpRequest(url: string): any {
    return this.http.get(url);
  }

  getMovie(movieUrl: string): any {
    return this.http.get(movieUrl);
  }

  getSpecies(speciesUrl: string): any {
    return this.http.get(speciesUrl);
  }
}
