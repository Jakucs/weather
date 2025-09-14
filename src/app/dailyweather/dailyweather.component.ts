import { Component } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dailyweather',
  imports: [CommonModule],
  templateUrl: './dailyweather.component.html',
  styleUrl: './dailyweather.component.css'
})
export class DailyweatherComponent {

  city: string = "";
  forecastData: any;

  constructor(private weatherApi: WeatherService){}



ngOnInit() {
  this.weatherApi.city$.subscribe(city => {
    if (city) {
      this.city = city;
      this.getForecastData();
    }
  });
}
  
  getForecastData(){
    this.weatherApi.getForecastByCity(this.city).subscribe(
      (data) => {
        this.forecastData = data;
        console.log("Forecast data: ", this.forecastData)
      },
      (error) => {
        console.log("Error message: ", error)
      }
    )
  }

  getWeatherIcon(main: string): string {
  switch (main) {
    case 'Clear': return 'https://img.icons8.com/?size=100&id=8EUmYhfLPTCF&format=png&color=000000';
    case 'Clouds': return 'https://img.icons8.com/?size=100&id=1RZffALm9Wgo&format=png&color=000000';
    case 'Rain': return 'https://img.icons8.com/?size=100&id=8cDNraQqdlD2&format=png&color=000000';
    default: return 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu4.webp';
  }
}


}
