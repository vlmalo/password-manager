import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // Initialize the form with validation
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      masterPassword: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit(): void {}

  // Custom validator to check if passwords match
  passwordsMatchValidator(formGroup: AbstractControl): { [key: string]: boolean } | null {
    const masterPassword = formGroup.get('masterPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return masterPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Constructing the formData object
      const formData = {
        name: this.registerForm.value.fullName, // Matches the User entity's name field
        email: this.registerForm.value.email, // Matches the User entity's email field
        password: this.registerForm.value.masterPassword // Matches the User entity's password field
      };

      // Send data to backend using the UserService
      this.userService.registerUser(formData).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    } else {
      console.log('Form is invalid or passwords do not match');
    }
  }

  // Toggles visibility of the master password field
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

  // Toggles visibility of the confirm password field
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
