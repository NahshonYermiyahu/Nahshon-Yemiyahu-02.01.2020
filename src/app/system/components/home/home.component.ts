import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm} from '@angular/forms';
import {WeatherService} from '../../services/weather.service';
import {WeatherItemModel} from '../../../shared/models/weatherItem.model';
import {WeatherDay} from '../../../shared/models/weatherDay';
import {PlaceholderDirective} from '../../../shared/placeholder/placeholder.directive';
import {Subscription} from 'rxjs';
import {AlertComponent} from '../../../shared/alert/alert.component';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../../assets/scss/home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  weatherItem = new WeatherItemModel ('', 0, 0, '');
  // weatherItem: WeatherItemModel;
  weatherDays: WeatherDay[] = [];
  error: string = null;
  // @ts-ignore
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  isLoading = false;

  constructor(private weatherService: WeatherService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit() {
    this.isLoading = true;
     this.getIdCity('Tel Aviv',1);
    this.activatedRoute.params
      .subscribe(data => {
        this.getIdCity(data.cityName, data.id);

        console.log(data.cityName)
        this.router.navigate(['home'], {queryParams: {}});
        this.isLoading = false;
      });
  }


  getIdCity(cityName: string, id: number) {
    this.isLoading = true;
    this.weatherService.searchIdCity(cityName)
      .subscribe(data => {
      this.getWeather(cityName, data[0].Key, id);
      this.isLoading = false;
    }, errorMessage => {
      console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
    });
  }

   static getWeekDay(date) {
    let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[date.getDay()];
  }

  getWeather(cityName: string, idCity: string, id: number) {
    this.isLoading = true;
    this.weatherService.searchWeatherData(idCity)
      .subscribe(data => {
      this.weatherItem = new WeatherItemModel(
        cityName,
        data.DailyForecasts[0].Temperature.Minimum.Value,
        data.DailyForecasts[0].Temperature.Maximum.Value,
        data.DailyForecasts[0].Day.IconPhrase,
        id
      );

      for(let i = 0; i < data.DailyForecasts.length; i++) {
        let weatherDay = new WeatherDay(
          HomeComponent.getWeekDay(new Date(Date.parse(data.DailyForecasts[i].Date))),
          data.DailyForecasts[i].Temperature.Maximum.Value,
          data.DailyForecasts[i].Temperature.Minimum.Value
        );
        this.weatherDays.push(weatherDay);

      }
        this.isLoading = false;

    }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      });

  }

  addWeatherItem(data: WeatherItemModel) {
    this.dataService.addWeatherItem(data).subscribe(res => {
      console.log(res);
    })
  }

  removeWeatherItem(data: WeatherItemModel) {
    this.dataService.deleteWeatherItem(data).subscribe(res => {
      console.log(res);
    })
  }

  onSubmit(setForm: NgForm) {
     let cityName = setForm.form.value.location;
     this.getIdCity(cityName, 1);
     this.weatherDays = [];
     setForm.reset();
  }

  onHandlerError() {
    this.error = null;
  }

  showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver
      .resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef
      .createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef
      .instance
      .close
      .subscribe(() => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

}
