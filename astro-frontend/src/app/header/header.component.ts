import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LoginComponent, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isModalOpen = false;

  // Opens the modal when "Login" button is clicked
  openModal() {
    this.isModalOpen = true;
  }

  // Closes the modal
  closeModal() {
    this.isModalOpen = false;
  }

}
