import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WeatherItemModel} from '../../shared/models/weatherItem.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  addWeatherItem(weather: WeatherItemModel): Observable<any> {
    return this.http.post('http://localhost:3000/weatherItems', weather,
      {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json'
        })
      })
  }
  getWeatherItems(): Observable<any> {
    return this.http.get('http://localhost:3000/weatherItems',
      {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json'
        })
      })
  }

  deleteWeatherItem(weather: WeatherItemModel): Observable<any> {
    return this.http.delete(`http://localhost:3000/weatherItems/${weather.id}`,
      {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json'
        })
      })
  }
}
