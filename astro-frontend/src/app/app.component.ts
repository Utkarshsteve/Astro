import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DailyHoroscopeComponent } from './daily-horoscope/daily-horoscope.component';
import { BirthChartComponent } from './birth-chart/birth-chart.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoveCompatibilityComponent } from './love-compatibility/love-compatibility.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BirthChartComponent,
    DailyHoroscopeComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    LoginComponent,
    LoveCompatibilityComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgbModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'astro-frontend';
}
