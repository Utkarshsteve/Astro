import { BirthChartComponent } from './birth-chart/birth-chart.component';
import { Routes } from '@angular/router';
import { DailyHoroscopeComponent } from './daily-horoscope/daily-horoscope.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoveCompatibilityComponent } from './love-compatibility/love-compatibility.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';


export const routes: Routes = [
  {path: 'daily-horoscope', component: DailyHoroscopeComponent},
  {path: 'birth-chart', component: BirthChartComponent},
  {path: 'love-compatibility', component: LoveCompatibilityComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: '', component: LandingPageComponent},
 // {path: '**', component: LandingPageComponent}
];
