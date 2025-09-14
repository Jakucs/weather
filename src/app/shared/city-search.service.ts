import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {

  private apiUrl = 'http://api.geonames.org/searchJSON';

  constructor(private http: HttpClient) {}

  searchCities(query: string, maxRows: number = 5): Observable<any> {
    const params = new HttpParams()
      .set('name_startsWith', query)
      .set('maxRows', maxRows.toString())
      .set('username', 'jakucs');

    return this.http.get(this.apiUrl, { params });
  }
}
