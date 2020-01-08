import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WeatherItemModel} from '../../shared/models/weatherItem.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  addWeatherItem(weather: WeatherItemModel): Observable<any> {
    return this.http.post(`https://weatherrm-92147.firebaseio.com/weatherItems/.json`, weather,
      {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json'
        })
      })
  }

  getWeatherItems(): Observable<any> {
    return this.http.get('https://weatherrm-92147.firebaseio.com/weatherItems/.json',
      {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json'
        })
      }).pipe(map(data => {
        const arrayData = [];
        for(const key in data) {
          if(data.hasOwnProperty(key)){
            arrayData.push({...data[key], id: key})
          }
        }
        return arrayData;
   }
      )
   )
  }

  deleteWeatherItem(id: string): Observable<any> {
    return this.http.delete(`https://weatherrm-92147.firebaseio.com/weatherItems/${id}.json`,
      {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json'
        })
      })
  }

}
