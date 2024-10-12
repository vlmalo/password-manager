import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      masterPassword: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form Submitted!', this.registerForm.value);
      // Handle registration logic
    } else {
      console.log('Form is invalid');
    }
  }

  toggleMasterPasswordVisibility(): void {
    const masterPasswordField = document.getElementById('masterPassword') as HTMLInputElement;
    const masterPasswordIcon = document.getElementById('masterPasswordIcon') as HTMLImageElement;

    if (masterPasswordField.type === 'password') {
      masterPasswordField.type = 'text';
      masterPasswordIcon.src = 'assets/images/hide.png';
    } else {
      masterPasswordField.type = 'password';
      masterPasswordIcon.src = 'assets/images/eye.png';
    }
  }

  toggleConfirmPasswordVisibility(): void {
    const confirmPasswordField = document.getElementById('confirmPassword') as HTMLInputElement;
    const confirmPasswordIcon = document.getElementById('confirmPasswordIcon') as HTMLImageElement;

    if (confirmPasswordField.type === 'password') {
      confirmPasswordField.type = 'text';
      confirmPasswordIcon.src = 'assets/images/hide.png';
    } else {
      confirmPasswordField.type = 'password';
      confirmPasswordIcon.src = 'assets/images/eye.png';
    }
  }
}
