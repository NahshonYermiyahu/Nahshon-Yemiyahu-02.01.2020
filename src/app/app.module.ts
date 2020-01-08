import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './system/components/favorites/favorites.component';
import { HomeComponent } from './system/components/home/home.component';
import { HeaderComponent } from './system/components/header/header.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AlertComponent } from './shared/alert/alert.component';
import {PlaceholderDirective} from './shared/placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { WeatherDayComponent } from './system/components/weather-day/weather-day.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';



@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    HomeComponent,
    HeaderComponent,
    AlertComponent,
    PlaceholderDirective,
    LoadingSpinnerComponent,
    WeatherDayComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule
  ],
  entryComponents: [
    AlertComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
