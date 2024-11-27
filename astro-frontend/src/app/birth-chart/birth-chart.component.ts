import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-birth-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './birth-chart.component.html',
  styleUrl: './birth-chart.component.css'
})
export class BirthChartComponent {
  birthChartForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.birthChartForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      timeOfBirth: ['', Validators.required],
      birthplace: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.birthChartForm.valid) {
      console.log('Form Submitted!', this.birthChartForm.value);
    } else {
      console.log('Form Invalid');
    }
  }

}
