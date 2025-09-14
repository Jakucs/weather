import { Component } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-weeklyweather',
  imports: [CommonModule, DatePipe],
  templateUrl: './weeklyweather.component.html',
  styleUrl: './weeklyweather.component.css'
})
export class WeeklyweatherComponent {

    forecastData: any;
    groupedForecast: any[] = [];
    city: string = "";

  constructor(private weatherApi: WeatherService) {}

    ngOnInit() {
    // ha a várost a service-ben tárolod (BehaviorSubject), itt feliratkozhatsz rá
    this.weatherApi.city$.subscribe(city => {
      if (city) {
        this.city = city;
        this.loadForecast();
      }
    });
  }

    loadForecast() {
    this.weatherApi.getForecastByCity(this.city).subscribe(
      (data) => {
        this.forecastData = data;
        this.groupedForecast = this.groupForecastByDay(this.forecastData.list);
        console.log("Grouped forecast: ", this.groupedForecast);
      },
      (error) => console.error("Error loading forecast: ", error)
    );
  }


groupForecastByDay(list: any[]): any[] {
  const grouped: { [date: string]: any[] } = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return Object.keys(grouped).map((date) => {
    const items = grouped[date];

    // minimum és maximum
    const temps = items.map(i => i.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    // leggyakoribb időjárás
    const weatherCounts: { [key: string]: number } = {};
    items.forEach((i) => {
      const weather = i.weather[0].main;
      weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;
    });
    const dominantWeather = Object.keys(weatherCounts).reduce((a, b) =>
      weatherCounts[a] > weatherCounts[b] ? a : b
    );

    return {
      date,
      minTemp: Math.round(minTemp),
      maxTemp: Math.round(maxTemp),
      weather: dominantWeather,
    };
  });
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
