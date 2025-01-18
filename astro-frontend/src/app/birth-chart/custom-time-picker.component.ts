// custom-time-picker.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-time-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="time-picker-overlay" (click)="onOverlayClick($event)">
      <div class="time-picker-dialog">
        <div class="dialog-header">
          <h2>Select Time of Birth</h2>
        </div>
        <div class="dialog-content">
          <div class="time-unit">
            <label>Hours</label>
            <select [(ngModel)]="selectedHours">
              <option *ngFor="let hour of hours" [value]="hour">{{hour.toString().padStart(2, '0')}}</option>
            </select>
          </div>
          <div class="time-unit">
            <label>Minutes</label>
            <select [(ngModel)]="selectedMinutes">
              <option *ngFor="let minute of minutes" [value]="minute">{{minute.toString().padStart(2, '0')}}</option>
            </select>
          </div>
          <div class="time-unit">
            <label>Seconds</label>
            <select [(ngModel)]="selectedSeconds">
              <option *ngFor="let second of seconds" [value]="second">{{second.toString().padStart(2, '0')}}</option>
            </select>
          </div>
        </div>
        <div class="dialog-actions">
          <button class="cancel-btn" (click)="onCancelClick()">Cancel</button>
          <button class="confirm-btn" (click)="onConfirmClick()">Confirm</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .time-picker-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .time-picker-dialog {
      background: white;
      border-radius: 8px;
      padding: 20px;
      min-width: 300px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .dialog-header {
      margin-bottom: 20px;
      text-align: center;
    }
    .dialog-content {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-bottom: 20px;
    }
    .time-unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .time-unit select {
      width: 70px;
      height: 40px;
      border: 1px solid #ddd;
      border-radius: 4px;
      text-align: center;
      font-size: 16px;
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    button {
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      border: none;
    }
    .cancel-btn {
      background: #f0f0f0;
    }
    .confirm-btn {
      background: #3498db;
      color: white;
    }
  `]
})
export class CustomTimePickerComponent {
  hours = Array.from({length: 24}, (_, i) => i);
  minutes = Array.from({length: 60}, (_, i) => i);
  seconds = Array.from({length: 60}, (_, i) => i);

  selectedHours = 0;
  selectedMinutes = 0;
  selectedSeconds = 0;

  @Input() set initialTime(time: string) {
    if (time) {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      this.selectedHours = hours || 0;
      this.selectedMinutes = minutes || 0;
      this.selectedSeconds = seconds || 0;
    }
  }

  @Output() timeSelected = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter<void>();

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('time-picker-overlay')) {
      this.onCancelClick();
    }
  }

  onCancelClick(): void {
    this.cancelled.emit();
  }

  onConfirmClick(): void {
    const time = `${this.selectedHours.toString().padStart(2, '0')}:${
      this.selectedMinutes.toString().padStart(2, '0')}:${
      this.selectedSeconds.toString().padStart(2, '0')}`;
    this.timeSelected.emit(time);
  }
}