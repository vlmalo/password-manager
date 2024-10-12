import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);

    } else {
      console.log('Form is invalid');
    }
  }

  togglePasswordVisibility(): void {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const passwordIcon = document.getElementById('passwordIcon') as HTMLImageElement;

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      passwordIcon.src = 'assets/images/hide.png';
    } else {
      passwordField.type = 'password';
      passwordIcon.src = 'assets/images/eye.png';
    }
  }
}
