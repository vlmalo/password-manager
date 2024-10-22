import { Component, OnInit, HostListener } from '@angular/core';
import { GenPasswordsComponent } from "../../common-ui/gen-passwords/gen-passwords.component";
import { AddPasswordModalComponent } from "../../common-ui/add-password-modal/add-password-modal.component";
import { CommonModule } from "@angular/common";
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {PasswordService} from '../../services/password.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    GenPasswordsComponent,
    CommonModule,
    AddPasswordModalComponent,
    RouterModule,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  username: string | null = null;
  email: string | null = null;
  isModalOpen: boolean = false;
  userData: any = {};
  showUserData: boolean = false;
  selectedPassword: any = null;
  passwords: any[] = [];


  constructor(public userService: UserService,
              private router: Router,
              private authService: AuthService,
              private passwordService: PasswordService) {}





  toggleUserData() {
    this.showUserData = !this.showUserData;
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
    this.passwordService.getPasswords().subscribe(
      (data) => {
        this.passwords = data;
      },
      (error) => {
        console.error('Error loading passwords', error);
      }
    );
  }


  addPasswordEntry(password: any) {
    this.passwordService.addPassword(password).subscribe(
      (response) => {
        this.passwords.push(response);
        this.closeModal();
      },
      (error) => {
        console.error('Error adding password', error);
      }
    );
  }



  openModal(isEdit: boolean = false, passwordData: any = null) {
    this.selectedPassword = passwordData;
    this.isModalOpen = true;

    if (this.selectedPassword) {
      this.isModalOpen = true;
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedPassword = null;
  }



  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (!targetElement.closest('.user-info') && !targetElement.closest('.user-data') && this.showUserData) {
      this.showUserData = false;
      console.log('Clicked outside, dropdown closed');
    }
  }
}
