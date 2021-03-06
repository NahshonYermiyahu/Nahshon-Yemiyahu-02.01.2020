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

  weatherItem = new WeatherItemModel ('', 0, 0, '','');
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
    this.getIdCity('Tel Aviv', '');
    this.activatedRoute.params
      .subscribe(data => {
        if(data.cityName){
          this.getIdCity(data.cityName,data.id);
        }

        this.router.navigate(['home'], {queryParams: {}});
        this.isLoading = false;
      });
  }


  getIdCity(cityName: string,id:string) {
    this.isLoading = true;
    this.weatherService.searchIdCity(cityName,id)
      .subscribe(data => {
      this.getWeather(cityName, data[0].Key,id);
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

  getWeather(cityName: string, idCity: string, id:string) {
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
          data.DailyForecasts[i].Temperature.Maximum.Value
        );
        this.weatherDays[i] = weatherDay;
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
    this.isLoading = true;
    this.dataService.addWeatherItem(data).subscribe(res => {
      console.log(res);
      this.isLoading = false;
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });
  }

  removeWeatherItem(data: string) {
    this.isLoading = true;
    this.dataService.deleteWeatherItem(data).subscribe(res => {
      if(res) {
        console.log(res);
      }
      this.isLoading = false;
    },errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });
  }

  onSubmit(setForm: NgForm) {
     let cityName = setForm.form.value.location;
     this.getIdCity(cityName, '');
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
