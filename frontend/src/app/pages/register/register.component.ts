import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
  ValidationErrors
} from '@angular/forms';
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
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['',     [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        Validators.pattern(/^[A-Za-z]+(\s[A-Za-z]+)?$/)
      ]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(50)
        ]],
      masterPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(24),
          this.passwordValidator
        ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const errors: ValidationErrors = {};

    if (!/[A-Za-z]/.test(value)) {
      errors['missingLetter'] = true;
    }
    if (!/[0-9]/.test(value)) {
      errors['missingNumber'] = true;
    }
    if (!/[!@#$%^&*]/.test(value)) {
      errors['missingSpecial'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }
  ngOnInit(): void {}

  passwordsMatchValidator(formGroup: AbstractControl): { [key: string]: boolean } | null {
    const masterPassword = formGroup.get('masterPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return masterPassword === confirmPassword ? null : { passwordsMismatch: true };
  }
  onSubmit(): void {
    console.log("Form submitted");
    if (this.registerForm.valid) {
      const formData = {
        name: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.masterPassword
      };

      this.userService.registerUser(formData).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error registering user', error); // Log the error
          this.errorMessage = error.error?.message || 'An unknown error occurred';
        }
      );
    } else {
      console.log('Form is invalid or passwords do not match');
      this.errorMessage = 'Form is invalid or passwords do not match';
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
