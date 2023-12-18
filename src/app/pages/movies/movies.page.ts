import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: any[] = [];
  genres: any[] = [];
  selectedGenre: string = '';
  searchQuery: string = '';
  currentPage = 1;
  imageBaseUrl = environment.images;
  selectedGenreChanged = false;

  constructor(
    private movieService: MovieService, 
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loadGenres();
    this.loadMovies();
  }

  async loadGenres() {
    this.movieService.getGenres().subscribe(response => {
      this.genres = response.genres;
    });
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    // Resetujte seznam, pokud se změní žánr nebo vyhledávací dotaz
    if (!event || this.selectedGenreChanged) {
      this.currentPage = 1;
      this.movies = [];
      this.selectedGenreChanged = false;
    }
  
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
  
    let fetchMovies;
  
    if (this.searchQuery) {
      fetchMovies = this.movieService.searchMovies(this.searchQuery, this.currentPage);
    } else {
      fetchMovies = this.movieService.getMoviesByGenre(this.selectedGenre, this.currentPage);
    }
  
    fetchMovies.subscribe(res => {
      loading.dismiss();
      this.movies = event ? [...this.movies, ...res.results] : res.results;
  
      if (event) {
        event.target.complete();
        event.target.disabled = res.total_pages === this.currentPage;
      }
    });
  }

  onGenreChange() {
    this.selectedGenreChanged = true;
    this.loadMovies();
  }
  

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }

  sortMoviesByRatingDesc() {
    this.movies = [...this.movies].slice(0, 100).sort((a, b) => b.vote_average - a.vote_average);
  }
  
  sortMoviesByRatingAsc() {
    this.movies = [...this.movies].slice(0, 100).sort((a, b) => a.vote_average - b.vote_average);
  }

  resetMovies() {
    this.selectedGenre = '';
    location.reload(); // Tímto dojde k obnovení stránky
  }

  navigateToAboutAuthor(){
    this.navCtrl.navigateForward('/about-author');
  }

  onSearchChange() {
    this.selectedGenre = '';
    this.selectedGenreChanged = true;
    this.loadMovies();
  }
  

  
}