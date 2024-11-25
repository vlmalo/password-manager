import { Component, OnInit, HostListener } from '@angular/core';
import { GenPasswordsComponent } from "../../common-ui/gen-passwords/gen-passwords.component";
import { CommonModule } from "@angular/common";
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PasswordService } from '../../services/password.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    GenPasswordsComponent,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  username: string | null = null;
  email: string | null = null;
  isModalOpen = false;
  userData: any = {};
  showUserData: boolean = false;
  selectedPassword: any = null;
  passwords: any[] = [];
  isSubmitting = false;
  passwordToEdit: any = null;
  masterPassword: string = '';


  constructor(
    public userService: UserService,
    private router: Router,
    private authService: AuthService,
    private passwordService: PasswordService
  ) {}

  toggleUserData() {
    this.showUserData = !this.showUserData;
  }

  onPasswordDeleted() {
    this.loadPasswords();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.loadPasswords();
  }

  loadPasswords() {

    this.passwordService.getPasswords(this.masterPassword).subscribe(
      (passwords) => {
        this.passwords = passwords;
      },
      (error) => {
        console.error("Error loading passwords", error);
      }
    );
  }


  submitPassword(form: any) {
    if (form.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const passwordData = {
        id: this.passwordToEdit.id || null,
        itemName: form.value.itemName || this.passwordToEdit.itemName || 'Service',
        username: form.value.username,
        password: form.value.password,
        uri: form.value.uri,
        notes: form.value.notes,
      };

      const saveObservable = passwordData.id
        ? this.passwordService.updatePassword(passwordData.id, passwordData, this.masterPassword)
        : this.passwordService.addPassword(passwordData, this.masterPassword);
      saveObservable.subscribe(
        (response) => {
          console.log('Password saved successfully:');
          this.loadPasswords();
          this.closeModal();
        },
        (error) => {
          console.error('Error saving password', error);
        },
        () => {
          this.isSubmitting = false;  // Reset submission state
        }
      );
    }
  }

  openModal(password?: any) {
    this.passwordToEdit = password || {
      itemName: 'Service',
      username: '',
      password: '',
      uri: '',
      notes: '',
    };
    this.isModalOpen = true;
  }


  closeModal() {
    this.isModalOpen = false;
  }

  togglePasswordVisibility(fieldId: string): void {
    const passwordField = document.getElementById(fieldId) as HTMLInputElement;
    const passwordIcon = document.getElementById(fieldId + 'Icon') as HTMLImageElement;

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      passwordIcon.src = 'assets/images/hide.png';
    } else {
      passwordField.type = 'password';
      passwordIcon.src = 'assets/images/eye.png';
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (!targetElement.closest('.user-info') && !targetElement.closest('.user-data') && this.showUserData) {
      this.showUserData = false;
      console.log('Clicked outside, dropdown closed');
    }
  }
  ngAfterViewInit() {
    this.preventScroll();
  }

  ngOnDestroy() {
    this.allowScroll();
  }

  preventScroll() {
    document.body.classList.add('modal-open');
  }

  allowScroll() {
    document.body.classList.remove('modal-open');
  }
}
