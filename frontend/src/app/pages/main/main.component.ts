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
  userName: string | null = null; // Store the user's name

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }


  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
