import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-love-compatibility',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './love-compatibility.component.html',
  styleUrl: './love-compatibility.component.css'
})
export class LoveCompatibilityComponent {
  compatibilityForm: FormGroup;
  compatibilityScore: number | null = null;
  message: string = '';

  constructor(private fb: FormBuilder) {
    this.compatibilityForm = this.fb.group({
      yourName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      partnerName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    });
  }

  calculateCompatibility() {
    if (this.compatibilityForm.valid) {
      const yourName = this.compatibilityForm.get('yourName')?.value.toLowerCase();
      const partnerName = this.compatibilityForm.get('partnerName')?.value.toLowerCase();

      // Simple love compatibility calculation based on character values
      const combinedLength = yourName.length + partnerName.length;
      this.compatibilityScore = (combinedLength * 23) % 101; // Random formula for fun!

      if (this.compatibilityScore > 80) {
        this.message = 'You both are a perfect match!';
      } else if (this.compatibilityScore > 50) {
        this.message = 'There’s great potential here!';
      } else {
        this.message = 'You may need to work on your relationship!';
      }
    }
  }
}
