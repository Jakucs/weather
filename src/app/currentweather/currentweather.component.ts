import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../shared/weather.service';
import { DailyweatherComponent } from '../dailyweather/dailyweather.component';
import { WeeklyweatherComponent } from "../weeklyweather/weeklyweather.component";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-currentweather',
  standalone: true,
  imports: [CommonModule, DailyweatherComponent, WeeklyweatherComponent],
  templateUrl: './currentweather.component.html',
  styleUrls: ['./currentweather.component.css']
})
export class CurrentweatherComponent {
  weatherData: any;
  showDaily = false;
  selectedDate: string | null = null; // <-- IDE KELL
  private destroy$ = new Subject<void>();

  constructor(private weatherService: WeatherService) {
    this.weatherService.weatherData$.subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData)
    });
  }

    ngOnInit(): void {
    this.weatherService.selectedDate$
      .pipe(takeUntil(this.destroy$))
      .subscribe(date => this.selectedDate = date);
  }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

  getWeatherImage(): string {
    if (!this.weatherData) return '';
    const temp = this.weatherData.main.temp;
    if (temp < 0) return 'assets/cold.jpg';
    else if (temp < 10) return 'assets/cool.jpg';
    else if (temp < 25) return 'assets/warm.jpg';
    else return 'assets/hot.jpg';
  }

  getLocalTime(): string {
    if (!this.weatherData) return '';
    const unixTime = this.weatherData.dt;
    const timezone = this.weatherData.timezone;
    const localTime = (unixTime + timezone) * 1000;
    const localDate = new Date(localTime);
    return localDate.toLocaleString("hu-HU", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC"
    });
  }

}
