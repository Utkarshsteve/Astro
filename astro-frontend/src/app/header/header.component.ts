import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LoginComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
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
