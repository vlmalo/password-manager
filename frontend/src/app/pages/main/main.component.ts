import { Component } from '@angular/core';
import {GenPasswordsComponent} from "../../common-ui/gen-passwords/gen-passwords.component";
import {AddPasswordModalComponent} from "../../common-ui/add-password-modal/add-password-modal.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
    imports: [
        GenPasswordsComponent,
        AddPasswordModalComponent,
        CommonModule
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isModalOpen: boolean = false; // Track modal visibility

  // Open the modal
  openModal() {
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
  }
}
