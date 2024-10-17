import { Component, OnInit } from '@angular/core';
import { GenPasswordsComponent } from "../../common-ui/gen-passwords/gen-passwords.component";
import { AddPasswordModalComponent } from "../../common-ui/add-password-modal/add-password-modal.component";
import { CommonModule } from "@angular/common";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    GenPasswordsComponent,
    CommonModule,
    AddPasswordModalComponent
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isModalOpen: boolean = false;
  userData: any;
  userName: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUserDashboard();
  }
  fetchUserDashboard() {
    this.userService.getUserDashboard().subscribe(
      (data) => {
        this.userData = data;
        this.userName = data.name;
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
}
