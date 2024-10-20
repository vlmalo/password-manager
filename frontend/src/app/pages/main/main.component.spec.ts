import { Component, OnInit, HostListener } from '@angular/core';
import { GenPasswordsComponent } from "../../common-ui/gen-passwords/gen-passwords.component";
import { AddPasswordModalComponent } from "../../common-ui/add-password-modal/add-password-modal.component";
import { CommonModule } from "@angular/common";
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  isModalOpen: boolean = false;
  userData: any = {};
  showUserData: boolean = false;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

  toggleUserData() {
    this.showUserData = !this.showUserData;
  }

  logout() {
    this.userService.logout();
    this.showUserData = false;
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    const savedUserData = this.userService.getUserData();
    if (savedUserData && savedUserData.email) {
      this.userData = savedUserData;
    } else {
      this.fetchUserDashboard();
    }
  }

  fetchUserDashboard() {
    this.userService.getUserDashboard().subscribe(
      (data) => {
        this.userData = data.user;
        this.authService.setUserData(this.userData);
        this.userService.saveUserData(this.userData);
        console.log('User Data:', this.userData);
      },
      (error) => {
        console.error('Error fetching user dashboard data', error);
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
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
