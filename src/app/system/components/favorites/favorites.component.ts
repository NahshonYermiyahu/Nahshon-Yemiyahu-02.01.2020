import { Component, OnInit } from '@angular/core';
import {WeatherItemModel} from '../../../shared/models/weatherItem.model';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import {WeatherService} from '../../services/weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['../../../../assets/scss/favorites.scss']
})
export class FavoritesComponent implements OnInit {

  weatherItems: WeatherItemModel[];

  constructor(private dataService: DataService,
              private weatherService: WeatherService,
              private router: Router) { }

  ngOnInit() {
    this.dataService.getWeatherItems().subscribe(data => {
      this.weatherItems = data;
      for(let i = 0;i < this.weatherItems.length; i++) {
        this.weatherService.searchIdCity(
          this.weatherItems[i].cityName,
          this.weatherItems[i].id
        )
          .subscribe(data => {
            this.weatherService.searchWeatherData(data[0].Key)
              .subscribe(data => {
                this.weatherItems[i] = new WeatherItemModel(
                  this.weatherItems[i].cityName,
                  data.DailyForecasts[0].Temperature.Minimum.Value,
                  data.DailyForecasts[0].Temperature.Maximum.Value,
                  data.DailyForecasts[0].Day.IconPhrase,
                  this.weatherItems[i].id
                );
              })
          })}
    });
  }

  details(weatherItem: WeatherItemModel) {
    let data = weatherItem;
    this.router.navigate(['home', data])

  }
}
