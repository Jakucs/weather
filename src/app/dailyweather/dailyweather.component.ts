import { Component, OnDestroy } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dailyweather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dailyweather.component.html',
  styleUrls: ['./dailyweather.component.css']
})
export class DailyweatherComponent implements OnDestroy {

  city: string = "";
  forecastData: any;
  selectedDate: string | null = null;
  dailyItems: any[] = [];

  private destroy$ = new Subject<void>();

  constructor(private weatherApi: WeatherService) {}

  ngOnInit() {
    // város figyelés
    this.weatherApi.city$
      .pipe(takeUntil(this.destroy$))
      .subscribe(city => this.city = city);

    // teljes előrejelzés figyelés
    this.weatherApi.forecast$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.forecastData = data;
        this.loadDailyForecast();
      });

    // kiválasztott nap figyelés
    this.weatherApi.selectedDate$
      .pipe(takeUntil(this.destroy$))
      .subscribe(date => {
        this.selectedDate = date;
        this.loadDailyForecast();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // nap szűrése a teljes előrejelzésből
  loadDailyForecast() {
    if (!this.forecastData || !this.selectedDate) {
      this.dailyItems = [];
      return;
    }

    this.dailyItems = this.forecastData.list.filter(
      (item: any) => item.dt_txt.startsWith(this.selectedDate!)
    );
    console.log("Daily items: ", this.dailyItems);
  }

  // visszalépés heti nézetre
  backToWeekly() {
    this.weatherApi.setSelectedDate(null); // service reset
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

