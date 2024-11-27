import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-horoscope',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './daily-horoscope.component.html',
  styleUrl: './daily-horoscope.component.css'
})

export class DailyHoroscopeComponent {
  today: Date = new Date();
  horoscopeData = {
    name: '',
    gender: '',
    birthdate: '',
    timeOfBirth: '',
    birthplace: ''
  };

  onSubmit() {
    if (this.horoscopeData.birthdate && new Date(this.horoscopeData.birthdate) > this.today) {
      alert('Birthdate cannot be in the future.');
    } else {
      console.log('Form Submitted', this.horoscopeData);
    }
  }

  // onSubmit() {
  //   if (this.horoscopeData.name && this.horoscopeData.gender && this.horoscopeData.birthdate && this.horoscopeData.birthplace) {
  //     console.log('Horoscope Data:', this.horoscopeData);
  //     // You can call a service here to get the horoscope data based on the input
  //   }
  // }

}
