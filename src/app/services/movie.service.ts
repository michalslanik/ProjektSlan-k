import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);
  }

  getMovieDetails(id: string) {
    return this.http.get(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`);
  }

  // Nová metoda pro načtení žánrů
  getGenres(): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/genre/movie/list?api_key=${environment.apiKey}`);
  }

  // Nová metoda pro načtení filmů podle žánru
  getMoviesByGenre(genreId: string, page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/discover/movie?api_key=${environment.apiKey}&with_genres=${genreId}&page=${page}`);
  }

  searchMovies(query: string, page: number) {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/search/movie?api_key=${environment.apiKey}&query=${encodeURIComponent(query)}&page=${page}`);
  }
}
