import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CustomTimePickerComponent } from './custom-time-picker.component';

@Component({
  selector: 'app-birth-chart',
  templateUrl: './birth-chart.component.html',
  styleUrls: ['./birth-chart.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    FormsModule,
  ]
})
export class BirthChartComponent implements OnInit {
  @Input() isBabyChart: boolean = false;
  birthChartForm!: FormGroup;
  maxDateTime: string = new Date().toISOString().slice(0, 16);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.birthChartForm = this.fb.group({
      name: ['', Validators.required],
      parentName: [this.isBabyChart ? '' : null],
      gender: ['', Validators.required],
      dob: ['', [Validators.required, this.dateTimeValidator.bind(this)]],
      placeOfBirth: ['', [Validators.required, this.indiaValidator]],
      contact: ['', [Validators.required, this.contactValidator]]
    });
  }

  dateTimeValidator(control: any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  indiaValidator(control: any) {
    const validPlaces = ['India']; // Add specific cities if needed
    if (!validPlaces.some((place) => control.value.includes(place))) {
      return { invalidPlace: true };
    }
    return null;
  }

  contactValidator(control: any) {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const phonePattern = /^[6-9]\d{9}$/;
    if (!emailPattern.test(control.value) && !phonePattern.test(control.value)) {
      return { invalidContact: true };
    }
    return null;
  }

  onSubmit() {
    if (this.birthChartForm.valid) {
      console.log(this.birthChartForm.value);
    }
  }
}
