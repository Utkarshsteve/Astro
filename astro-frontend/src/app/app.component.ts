import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModule
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DailyHoroscopeComponent } from './daily-horoscope/daily-horoscope.component';
import { BirthChartComponent } from './birth-chart/birth-chart.component';
import { LoveCompatibilityComponent } from './love-compatibility/love-compatibility.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BirthChartComponent, DailyHoroscopeComponent, LandingPageComponent, LoveCompatibilityComponent, RouterOutlet, RouterLink, RouterLinkActive, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'astro-frontend';
}
