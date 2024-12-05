import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() closeModal = new EventEmitter<void>();

  constructor(private authService: SocialAuthService) {}

  ngOnInit(): void {
    // Optional: Initialize the social login service if needed
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(user => {
        console.log('User signed in:', user);
        // Handle login success (e.g., close modal, redirect, etc.)
      })
      .catch(error => console.error('Login failed:', error));
  }

  // Function to close the modal
  close() {
    this.closeModal.emit();  // Notify the parent component (Header) to close the modal
  }

}
