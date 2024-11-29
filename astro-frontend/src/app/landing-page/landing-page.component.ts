import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from "../header/header.component"; // Import NgbModule
import { FooterComponent } from '../footer/footer.component';
import { AboutUsComponent } from '../about-us/about-us.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [AboutUsComponent, FooterComponent, NgbModule, RouterLink, RouterLinkActive, RouterOutlet, HeaderComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
