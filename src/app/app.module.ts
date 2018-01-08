import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CarsListComponent } from './cars/cars-list/cars-list.component';
import { TotalCostComponent } from './cars/total-cost/total-cost.component';
import { CarsService } from './cars/cars.service';
import {  HttpModule } from '@angular/http';
import { CoreModuleModule } from "./core-module/core-module.module";
import { SharedModuleModule } from './shared-module/shared-module.module';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing-module";
import { CarsRoutingModule } from './cars/cars-routing-module';
import { CarDetailsComponent } from './cars/car-details/car-details.component';
import { CarResolve } from './cars/car-resolve.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CarsListComponent,
    TotalCostComponent,
    CarDetailsComponent,
  ],

  imports: [
    HttpModule,
    BrowserModule,
    CoreModuleModule,
    SharedModuleModule,
    AppRoutingModule,
    CarsRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    CarsService,
    CarResolve,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
