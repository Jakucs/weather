import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../shared/weather.service';

@Component({
  selector: 'app-currentweather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currentweather.component.html',
  styleUrls: ['./currentweather.component.css']
})
export class CurrentweatherComponent {
  weatherData: any;

  constructor(private weatherService: WeatherService) {
    // Feliratkozás a service adataira
    this.weatherService.weatherData$.subscribe(data => {
      this.weatherData = data;
    });
  }

  getWeatherImage(): string {
    if (!this.weatherData) return '';
    const temp = this.weatherData.main.temp;
    if (temp < 0) return 'assets/cold.jpg';
    else if (temp < 10) return 'assets/cool.jpg';
    else if (temp < 25) return 'assets/warm.jpg';
    else return 'assets/hot.jpg';
  }
}
