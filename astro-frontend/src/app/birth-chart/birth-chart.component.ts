import { Component, OnInit } from '@angular/core';
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
    CustomTimePickerComponent
  ]
})
export class BirthChartComponent implements OnInit {
  birthChartForm!: FormGroup;
  babyBirthChartForm!: FormGroup;
  activeForm: 'personal' | 'baby' | null = null;
  maxDate: string;
  maxTime: string;
  showTimePicker = false;
  timePickerType: 'personal' | 'baby' | null = null;

  countries = [
    { code: 'IN', name: 'India' },
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
  ];

  countryCodes = [
    { code: '+91', flag: '🇮🇳' },
    { code: '+1', flag: '🇺🇸' },
    { code: '+44', flag: '🇬🇧' },
  ];

  questionTypes = [
    'Career & Business',
    'Love & Relationships',
    'Health & Wellness',
    'Family & Children',
    'Wealth & Finance',
    'Education & Learning',
    'Travel & Relocation',
    'Spiritual Growth'
  ];

  selectedCountryStates: string[] = [];

  constructor(private fb: FormBuilder) {
    const now = new Date();
    this.maxDate = now.toISOString().split('T')[0];
    this.maxTime = now.toTimeString().slice(0, 8);
    this.initializeForms();
  }

  ngOnInit(): void {
    this.setupFormListeners();
  }

  private initializeForms(): void {
    // Initialize Personal Birth Chart Form
    this.birthChartForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.dateValidator()]],
      timeOfBirth: ['', [Validators.required, this.timeValidator()]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      countryCode: ['+91'],
      whatsappNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
      questionType: [''],
      question: ['']
    });

    // Initialize Baby Birth Chart Form
    this.babyBirthChartForm = this.fb.group({
      babyName: [''],
      parentName: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.dateValidator()]],
      timeOfBirth: ['', [Validators.required, this.timeValidator()]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      countryCode: ['+91'],
      whatsappNumber: ['', [Validators.pattern('^[0-9]{10}$')]]
    });
  }

  private setupFormListeners(): void {
    this.birthChartForm.get('country')?.valueChanges.subscribe(country => {
      this.updateStates(country);
    });

    this.babyBirthChartForm.get('country')?.valueChanges.subscribe(country => {
      this.updateStates(country);
    });

    this.birthChartForm.get('questionType')?.valueChanges.subscribe(type => {
      const questionControl = this.birthChartForm.get('question');
      if (type) {
        questionControl?.setValidators([Validators.required, Validators.minLength(10)]);
      } else {
        questionControl?.clearValidators();
      }
      questionControl?.updateValueAndValidity();
    });
  }

  private dateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate > today) {
        return { futureDate: true };
      }
      return null;
    };
  }

  private timeValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const selectedTime = control.value;
      const form = control.parent as FormGroup;
      if (!form) return null;

      const selectedDate = form.get('dateOfBirth')?.value;
      
      if (selectedDate) {
        const today = new Date().toISOString().split('T')[0];
        if (selectedDate === today) {
          const now = new Date();
          const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
          
          if (selectedTime > currentTime) {
            return { futureTime: true };
          }
        }
      }
      return null;
    };
  }

  updateStates(country: string): void {
    switch(country) {
      case 'IN':
        this.selectedCountryStates = [
          'Andhra Pradesh', 'Karnataka', 'Kerala', 'Tamil Nadu',
          'Maharashtra', 'Gujarat', 'Delhi', 'Uttar Pradesh'
        ];
        break;
      case 'US':
        this.selectedCountryStates = [
          'California', 'New York', 'Texas', 'Florida',
          'Illinois', 'Pennsylvania'
        ];
        break;
      case 'UK':
        this.selectedCountryStates = [
          'England', 'Scotland', 'Wales', 'Northern Ireland'
        ];
        break;
      default:
        this.selectedCountryStates = [];
    }
  }

  setActiveForm(formType: 'personal' | 'baby'): void {
    this.activeForm = formType;
  }

  closeForm(): void {
    this.activeForm = null;
    this.birthChartForm.reset();
    this.babyBirthChartForm.reset();
    this.birthChartForm.patchValue({ countryCode: '+91' });
    this.babyBirthChartForm.patchValue({ countryCode: '+91' });
  }

  openDatePicker(event: any): void {
    const input = event.target as HTMLInputElement;
    input.showPicker();
  }

  openTimePicker(formType: 'personal' | 'baby'): void {
    this.timePickerType = formType;
    this.showTimePicker = true;
  }

  handleTimeSelected(time: string): void {
    const form = this.timePickerType === 'personal' ? this.birthChartForm : this.babyBirthChartForm;
    form.patchValue({ timeOfBirth: time });
    this.showTimePicker = false;
    this.timePickerType = null;
  }

  handleTimePickerCancelled(): void {
    this.showTimePicker = false;
    this.timePickerType = null;
  }

  onSubmit(formType: 'personal' | 'baby'): void {
    const form = formType === 'personal' ? this.birthChartForm : this.babyBirthChartForm;
    
    if (form.valid) {
      console.log('Form submitted:', form.value);
      this.closeForm();
    } else {
      this.markFormGroupTouched(form);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get currentForm(): FormGroup {
    return this.activeForm === 'personal' ? this.birthChartForm : this.babyBirthChartForm;
  }

  isFieldInvalid(formType: 'personal' | 'baby', fieldName: string): boolean {
    const form = formType === 'personal' ? this.birthChartForm : this.babyBirthChartForm;
    const field = form.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  getErrorMessage(formType: 'personal' | 'baby', fieldName: string): string {
    const form = formType === 'personal' ? this.birthChartForm : this.babyBirthChartForm;
    const field = form.get(fieldName);
    
    if (!field) return '';

    if (field.hasError('required')) return 'This field is required';
    if (field.hasError('minlength')) return 'Input is too short';
    if (field.hasError('pattern')) return 'Invalid format';
    if (field.hasError('futureDate')) return 'Cannot select a future date';
    if (field.hasError('futureTime')) return 'Cannot select a future time';
    
    return '';
  }
}