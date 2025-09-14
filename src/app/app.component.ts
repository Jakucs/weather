import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { WeatherService } from './shared/weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitySearchService } from './shared/city-search.service';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cityName: string = '';
  cityOptions: string[] = [];
  private searchSubject = new Subject<string>();

  constructor(
    private weatherService: WeatherService,
    private citySearchService: CitySearchService
  ) {}

  ngOnInit() {
    this.setWeatherByCurrentLocation();

    // Debounce + API
    this.searchSubject.pipe(
      debounceTime(400),          // 400ms várakozás a gépelés után, api miatt
      distinctUntilChanged(),     // csak változás esetén
      switchMap(query => {
        if (query.length < 2) return of([]); // legalább 2 karakter
        return this.citySearchService.searchCities(query).pipe(
          catchError(err => {
            console.error('City API error:', err);
            return of([]);
          })
        );
      })
    ).subscribe((res: any) => {
      // GeoNames esetén a találatok 'geonames' mezőben vannak
      this.cityOptions = res?.geonames?.map((c: any) => `${c.name}, ${c.countryName}`) || [];
      console.log('City options:', this.cityOptions);
    });
  }

  onCityInput() {
    this.searchSubject.next(this.cityName);
  }

  searchWeather() {
    if (!this.cityName) return;

    this.weatherService.setCity(this.cityName);

    this.weatherService.getCurrentWeatherByCity(this.cityName).subscribe({
      next: (data) => this.weatherService.setWeatherData(data),
      error: (err) => console.error('Weather API error:', err)
    });
  }

  setWeatherByCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.weatherService.getCurrentWeather(lat, lon).subscribe({
            next: (data) => {
              this.weatherService.setWeatherData(data);
              if (data?.name) this.weatherService.setCity(data.name);
            },
            error: (err) => console.error('Error fetching weather by location:', err)
          });
        },
        (error) => console.error('Geolocation error:', error)
      );
    }
  }
}
