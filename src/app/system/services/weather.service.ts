import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  searchIdCity(cityName: string, id: string): Observable<any> {
    return this.http
      .get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=guZ9PWVRxsqJX2UvjZPDb7r0kqCx0Syr&q=${cityName}`)
      .pipe(catchError(WeatherService.handleError));
  }


  searchWeatherData(idCity: string): Observable<any> {
    return this.http
      .get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${idCity}?apikey=guZ9PWVRxsqJX2UvjZPDb7r0kqCx0Syr&metric=true`)
      .pipe(catchError(WeatherService.handleError));
  }

  private static handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes.error);
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case '400':
        errorMessage = 'Request had bad syntax or the parameters supplied were invalid.';
        break;
      case '401 Unauthorized':
        errorMessage = 'Unauthorized. API authorization failed.';
        break;
      case '403':
        errorMessage = 'Unauthorized. You do not have permission to access this endpoint.';
        break;
      case '404':
        errorMessage = 'Server has not found a route matching the given URI.';
        break;
      case '500':
        errorMessage = 'Server encountered an unexpected condition which prevented it from fulfilling the request.';
        break;
    }
    return throwError(errorMessage);
  }
}

// guZ9PWVRxsqJX2UvjZPDb7r0kqCx0Syr
//254946
