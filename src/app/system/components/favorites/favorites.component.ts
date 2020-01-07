import { Component, OnInit } from '@angular/core';
import {WeatherItemModel} from '../../../shared/models/weatherItem.model';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['../../../../assets/scss/favorites.scss']
})
export class FavoritesComponent implements OnInit {

  weatherItems: WeatherItemModel[];

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.dataService.getWeatherItems().subscribe(data => {
      this.weatherItems = data;
      console.log(this.weatherItems)
    })
  }

  // addWeatherItem(weatherItem: WeatherItemModel) {
  //   this.dataService.addWeatherItem(weatherItem).subscribe(data => {
  //     this.weatherItems.push(data);
  //   })
  // }

  deleteWeatherItem(weatherItem: WeatherItemModel) {
    this.dataService.deleteWeatherItem(weatherItem).subscribe(data => {
      this.weatherItems = this.weatherItems.filter(c => c.id != weatherItem.id);
      console.log(this.weatherItems);
    })
  }

  details(weatherItem: WeatherItemModel) {
    let data = weatherItem;
    console.log(data);
    this.router.navigate(['home', data])

  }
}
