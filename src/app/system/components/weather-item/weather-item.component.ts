import {Component, Input, OnInit} from '@angular/core';
import {WeatherItemModel} from '../../../shared/models/weatherItem.model';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {

  @Input() weatherData: WeatherItemModel;

  constructor() { }

  ngOnInit() {
  }


}
