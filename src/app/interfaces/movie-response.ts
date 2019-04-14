import {Movie} from './movie';

export interface MovieResponse {
  count: number;
  next: object;
  prev: object;
  results: Array<Movie>;
}
