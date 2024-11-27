import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModule

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NgbModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
