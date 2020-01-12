import { Component, OnInit, Input } from '@angular/core';
import {WeatherDay} from '../../../shared/models/weatherDay';

@Component({
  selector: 'app-weather-day',
  templateUrl: './weather-day.component.html',
  styleUrls: ['../../../../assets/scss/day.scss']
})
export class WeatherDayComponent  {

  @Input() weatherDays: WeatherDay[];

}
