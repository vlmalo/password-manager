import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const authRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.userService.loginUser(authRequest).subscribe(
        (response) => {
          console.log('Login successful', response);
          localStorage.setItem('username', response.username);
          localStorage.setItem('email', response.email);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Login failed', error);
          this.errorMessage = error?.error?.error || 'Invalid email or password';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }

  togglePasswordVisibility(): void {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    }
  }
}
