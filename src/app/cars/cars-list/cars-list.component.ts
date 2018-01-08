import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { Car } from "../models/car";
import { TotalCostComponent } from "../total-cost/total-cost.component";
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss'],
  encapsulation: ViewEncapsulation.None,   //style sa widzialne globalne
})
export class CarsListComponent implements OnInit {
  @ViewChild("totalCostRef") totalCostRef : TotalCostComponent;
  totalCost: number;
  grossCost: number;
  cars: Car[];
  carForm : FormGroup;

  constructor(
    private carsService : CarsService,
    private formBulider : FormBuilder,
    private router : Router,
  ) {

   }

  ngOnInit() {
    this.loadCars();
    this.carForm=this.buildCarForm();
  }

  buildCarForm() {
    return this.formBulider.group({
      model: ['',Validators.required],
      type: '',
      plate: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(7)]],
      deliveryDate: '',
      deadline: '',
      color: '',
      power: '',
      clientFirstName: '',
      clientSurname: '',
      cost: '',
      year: '',
      isFullyDamaged: '',
    })
  }

  loadCars() : void {
    this.carsService.getCars().subscribe((cars)=>{
      this.cars=cars;
      this.countTotalCost();
    })
  }

  ngAfterViewInit() {
    this.totalCostRef.showGross();  //wyswietla kwote brutto po zaladowaniu
  }

  showGross() : void {
    this.totalCostRef.showGross();
  }

  countTotalCost(): void {
    this.totalCost = this.cars.map((car) => car.cost).reduce((prev, next) => prev + next);
  }

  onShownGross(grossCost : number) :void {
    this.grossCost=grossCost;
  }

  goToCarDetails(car : Car) {
    this.router.navigate(['/cars', car.id]);
  }

  addCar() {
    this.carsService.addCar(this.carForm.value).subscribe(()=> {
      this.loadCars();
    })
  }

}
