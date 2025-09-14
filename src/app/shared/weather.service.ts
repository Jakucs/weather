import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '8389ec82f9021ebc62ba3842d08bf866';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

    private weatherDataSubject = new BehaviorSubject<any>(null);
    weatherData$ = this.weatherDataSubject.asObservable();

    private citySubject = new BehaviorSubject<string>('');
    city$ = this.citySubject.asObservable();

    private forecastSubject = new BehaviorSubject<any | null>(null);
    forecast$ = this.forecastSubject.asObservable();

    private selectedDateSubject = new BehaviorSubject<string | null>(null);
    selectedDate$ = this.selectedDateSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCurrentWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

    getCurrentWeatherByCity(city: string): Observable<any> {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  getForecastByCity(city: string): Observable<any> {
  const url = `${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
  return this.http.get(url);
  }

  setWeatherData(data: any) {
    this.weatherDataSubject.next(data);
  }

  setCity(city: string) {
    this.citySubject.next(city);
    this.loadForecast(city);
  }

    private loadForecast(city: string) {
    const url = `${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=hu`;
    this.http.get(url).pipe(
      tap((data) => this.forecastSubject.next(data))
    ).subscribe();
  }

    setSelectedDate(date: string | null) {
    this.selectedDateSubject.next(date);
  }

  searchCities(query: string): Observable<any[]> {
    if (!query) return new Observable(sub => sub.next([])); // üres lekérés esetén
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${this.apiKey}`;
    return this.http.get<any[]>(url);
  }

}
