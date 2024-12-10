import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgbModule, NgbModal, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

interface FormConfig {
  baseControls: { [key: string]: any };
  title: string;
  submitLabel: string;
}

@Component({
  selector: 'app-birth-chart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent, 
    FooterComponent, 
    NgbModule,
    NgbTimepickerModule,
    NgbDatepickerModule,
    ReactiveFormsModule
  ],
  templateUrl: './birth-chart.component.html',
  styleUrls: ['./birth-chart.component.css'],
  animations: [
    trigger('boxState', [
      state('normal', style({
        transform: 'scale(1)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
      })),
      state('selected', style({
        transform: 'scale(1.05)',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)'
      })),
      transition('normal => selected', animate('200ms ease-in')),
      transition('selected => normal', animate('200ms ease-out'))
    ])
  ]
})
export class BirthChartComponent implements OnInit {
  @ViewChild('personalDob', { static: false }) personalDobDatepicker: any;
  @ViewChild('babyDob', { static: false }) babyDobDatepicker: any;

  isBirthChartSelected = false;
  isBabyBirthChartSelected = false;
  
  birthChartTooltip = 'Dive deep into your personal cosmic blueprint';
  babyBirthChartTooltip = 'Unlock your baby\'s unique celestial potential';

  birthChartForm!: FormGroup;
  babyBirthChartForm!: FormGroup;
  formType: 'personal' | 'baby' = 'personal';
  locationSuggestions: string[] = [];
  isFormSubmitted = false;
  modalTitle = '';
  submitButtonText = '';

  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  formConfigs: { [key: string]: FormConfig } = {
    personal: {
      baseControls: {
        name: ['', [Validators.required, Validators.minLength(2)]],
        dob: [null, [Validators.required, this.dateValidator]],
        birthTime: [{ hour: null, minute: null, second: null }, [Validators.required, this.timeValidator]],
        birthPlace: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        question: [''],
        latitude: [''],
        longitude: ['']
      },
      title: 'Personal Birth Chart Horoscope',
      submitLabel: 'Submit Birth Chart'
    },
    baby: {
      baseControls: {
        babyName: [''], 
        motherName: ['', [Validators.required, Validators.minLength(2)]],
        fatherName: ['', [Validators.required, Validators.minLength(2)]],
        dob: [null, [Validators.required, this.dateValidator]],
        birthTime: [{ hour: null, minute: null, second: null }, [Validators.required, this.timeValidator]],
        birthPlace: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        latitude: [''],
        longitude: ['']
      },
      title: 'Baby Birth Chart Horoscope',
      submitLabel: 'Submit Baby Birth Chart'
    }
  };

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.resetSelections();
    this.initializeForm('personal');
  }

  // Date validator method
  dateValidator(control: AbstractControl): {[key: string]: any} | null {
    if (!control.value) return null;

    const inputDate = new Date(
      control.value.year, 
      control.value.month - 1, 
      control.value.day
    );
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    if (isNaN(inputDate.getTime())) {
      return { 'invalidDate': true };
    }

    if (inputDate > today) {
      return { 'futureDate': true };
    }

    if (inputDate > minAgeDate) {
      return { 'underAge': true };
    }

    return null;
  }

  // Time validator method
  timeValidator(control: AbstractControl): {[key: string]: any} | null {
    const time = control.value;
    if (!time) return null;

    const { hour, minute } = time;
    
    if (hour === null || minute === null) {
      return { 'invalidTime': true };
    }

    if (hour < 0 || hour > 23) {
      return { 'invalidHours': true };
    }

    if (minute < 0 || minute > 59) {
      return { 'invalidMinutes': true };
    }

    return null;
  }

  // Open datepicker method (updated)
  openDatepicker() {
    if (this.formType === 'personal') {
      // Use optional chaining to safely call toggle
      this.personalDobDatepicker?.toggle();
    } else {
      this.babyDobDatepicker?.toggle();
    }
  }

  resetSelections() {
    this.isBirthChartSelected = false;
    this.isBabyBirthChartSelected = false;
  }

  initializeForm(type: 'personal' | 'baby') {
    this.formType = type;
    const config = this.formConfigs[type];

    this.modalTitle = config.title;
    this.submitButtonText = config.submitLabel;

    const formControls = config.baseControls;

    if (type === 'personal') {
      this.birthChartForm = this.fb.group(formControls);
    } else {
      this.babyBirthChartForm = this.fb.group(formControls);
    }
  }

  // Dynamically get current form
  getCurrentForm(): FormGroup {
    return this.formType === 'personal' 
      ? this.birthChartForm 
      : this.babyBirthChartForm;
  }

  // Location suggestion method
  onLocationInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    if (input.length > 2) {
      this.locationSuggestions = [
        `${input}, City, Country`,
        `Another ${input} Location`,
        `${input} Metropolitan Area`
      ].filter(location => 
        location.toLowerCase().includes(input.toLowerCase())
      );
    } else {
      this.locationSuggestions = [];
    }
  }

  // Select location method
  selectLocation(location: string) {
    const currentForm = this.getCurrentForm();
    
    currentForm?.get('birthPlace')?.setValue(location);
    this.locationSuggestions = [];

    // Simulate geocoding
    this.setLocationCoordinates(location);
  }

  // Set location coordinates method
  setLocationCoordinates(location: string) {
    const currentForm = this.getCurrentForm();
    
    // Placeholder coordinates
    currentForm?.patchValue({
      latitude: '40.7128', 
      longitude: '-74.0060'  
    });
  }

  // Modal open methods
  onBirthChartClick(content: any) {
    this.isBirthChartSelected = true;
    this.isBabyBirthChartSelected = false;
    this.isFormSubmitted = false;
    this.initializeForm('personal');
    this.openFormModal(content);
  }

  onBabyBirthChartClick(content: any) {
    this.isBabyBirthChartSelected = true;
    this.isBirthChartSelected = false;
    this.isFormSubmitted = false;
    this.initializeForm('baby');
    this.openFormModal(content);
  }

  openFormModal(content: any) {
    this.modalService.open(content, { 
      centered: true, 
      size: 'lg', 
      backdrop: 'static' 
    });
  }

  // Form submission method
  onSubmit(formType: 'personal' | 'baby'): void {
    this.isFormSubmitted = true;
    const currentForm = this.getCurrentForm();

    if (currentForm?.valid) {
      console.log(`${formType.charAt(0).toUpperCase() + formType.slice(1)} Birth Chart Form Submitted`, currentForm.value);
      // Add your submission logic here
    } else {
      this.displayValidationErrors(currentForm);
    }
  }

  // Validation error display method
  displayValidationErrors(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control?.invalid) {
        control.markAsTouched();
        console.log(`Validation error in ${field}`);
      }
    });
  }

  // Keyboard event handler
  onKeyPress(event: KeyboardEvent, type: 'personal' | 'baby', content: any) {
    if (event.key === 'Enter' || event.key === ' ') {
      type === 'personal' 
        ? this.onBirthChartClick(content) 
        : this.onBabyBirthChartClick(content);
    }
  }

  // Method to check form control validity
  isControlInvalid(controlName: string): boolean {
    const control = this.formType === 'personal' 
      ? this.birthChartForm?.get(controlName) 
      : this.babyBirthChartForm?.get(controlName);
    return !!(control && this.isFormSubmitted && control.invalid);
  }
}
