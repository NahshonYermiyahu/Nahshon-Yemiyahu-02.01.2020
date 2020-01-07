import { Component, OnInit } from '@angular/core';
import {WeatherItemModel} from '../../../shared/models/weatherItem.model';
import {DataService} from '../../services/data.service';


@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit {

  weatherItems: WeatherItemModel[];

  constructor() { }

  ngOnInit() {
  }

}
