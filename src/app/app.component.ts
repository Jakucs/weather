import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { WeatherService } from './shared/weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cityName: string = '';

  constructor(private weatherService: WeatherService){}

  ngOnInit() {
    this.setWeatherByCurrentLocation();
  }

  searchWeather() {
    if (!this.cityName) return;

    this.weatherService.getCurrentWeatherByCity(this.cityName).subscribe({
      next: (data) => this.weatherService.setWeatherData(data),
      error: (err) => {
        console.error('Error:', err);
        this.setWeatherByCurrentLocation();
      }
    });
  }

  setWeatherByCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.weatherService.getCurrentWeather(lat, lon).subscribe({
            next: (data) => this.weatherService.setWeatherData(data),
            error: (err) => console.error('Error fetching weather by location:', err)
          });
        },
        (error) => console.error('Geolocation error:', error)
      );
    }
  }
}


