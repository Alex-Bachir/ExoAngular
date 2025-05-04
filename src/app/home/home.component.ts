import { Component, ElementRef, inject, ViewChild, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// <button class="primary" (click)="filterResults(filter.value)" typ>Search</button>
@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent, ReactiveFormsModule],
  template: `
    <section>
      <form [formGroup]='form'>
        <input type="text" placeholder="Filter by city" formControlName='filter'/>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrl: './home.component.css',
  providers: []
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  filteredLocationList: HousingLocation[] = [];
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  form: FormGroup;

  constructor() {
    
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });

    //Création du formulaire
    this.form = new FormGroup({
      filter: new FormControl('')
    });
    
    this.form.valueChanges.subscribe((val) => {
      this.filterResults(val.filter);
    })
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase()) || housingLocation?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
  
}
