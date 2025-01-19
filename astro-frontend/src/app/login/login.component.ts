import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() closeModal = new EventEmitter<void>();

  user!: SocialUser;
  loggedIn: boolean = false;

  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.user !=null)
      console.log(user, this.loggedIn)
    });
  }
  // Function to close the modal
  close() {
    this.closeModal.emit();  // Notify the parent component (Header) to close the modal
  }

  signOut(): void {
    this.authService.signOut();
  }

}
